import { ActivatedRoute } from '@angular/router';
import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { NgTerminal } from 'ng-terminal';

import { IOs } from '../../interfaces/ios';
import { IEmu } from '../../interfaces/iemu';
import { EmuService } from '../../service/emu.service';
import { OsService } from '../../service/os.service';
import { NgNovncComponent } from '../ng-novnc/ng-novnc.component';

@Component({
  selector: 'app-os-detail',
  templateUrl: './os-detail.component.html',
  styleUrls: ['./os-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OsDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  public os?: IOs;
  public previewPhotos!: URL[];
  public terminalOpened: boolean = false;
  public graphicOpened: boolean = false;
  public runTerminalText!: string;
  public runGraphicText!: string;
  public terminalDisabled: boolean = false;
  public graphicDisabled: boolean = false;

  private _destroy$ = new Subject<void>();
  private _emu?: IEmu;
  private readonly _runTerminalClose: string = 'Закрыть терминал';
  private readonly _runTerminalOpen: string = 'Запустить терминал';
  private readonly _runGraphicClose: string = 'Закрыть графику';
  private readonly _runGraphicOpen: string = 'Запустить графику';
  private _isFirstTermInit: boolean = true;
  @ViewChild('xterm', {static: false}) xterm!: NgTerminal;
  @ViewChild('novnc') novnc!: NgNovncComponent;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _osService: OsService,
    private readonly _emuService: EmuService
  ) {
    this.runTerminalText = this._runTerminalOpen;
    this.runGraphicText = this._runGraphicOpen;
  }

  public openCloseTerminal() {
    if(this.terminalOpened) {
      this._onCloseTerminal();
      this.graphicDisabled = false;
    }
    else {
      this._onOpenTerminal();
      this.graphicDisabled = true;
    }
  }

  public openCloseGraphic() {
    if(this.graphicOpened) {
      this._onCloseGraphic();
      this.terminalDisabled = false;
    }
    else {
      this._onOpenGraphic();
      this.terminalDisabled = true;
    }
  }

  public ngAfterViewChecked() {
    if(this.terminalOpened && this.xterm && this._isFirstTermInit) {
      this.xterm.onData()
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((input) => {
          if(this._emu && this.terminalOpened) this._emuService.sendToEmu(input);
      });
      this._isFirstTermInit = false;
    }
  }

  public ngOnInit(): void {
    this._getOsFromService();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._stopEmu();
  }

  private _onOpenTerminal() {
    this.runTerminalText = this._runTerminalClose;
    this.terminalOpened = true;

    this._getEmuFromService();
  }

  private _onCloseTerminal() {
    this.runTerminalText = this._runTerminalOpen;
    this.terminalOpened = false;
    this._isFirstTermInit = true;

    this._stopEmu();
  }

  private _onOpenGraphic() {
    this.runGraphicText = this._runGraphicClose;
    this.graphicOpened = true;

    this._getEmuFromService();
  }

  private _onCloseGraphic() {
    this.runGraphicText = this._runGraphicClose;
    this.graphicOpened = false;

    this.novnc.closeVNC();
    this._stopEmu();
  }

  private _subscribeToSocket() {
    if(!this._emu) return;

    this._emuService.getEmulationWebSocket(
      this._activatedRoute.snapshot.params['id'],
      this._emu.emulationId
    )
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
      (message: string) => {
        if (message.slice(0, 2) === '0:' && this.terminalOpened){
          this.xterm.write(message.slice(2));
        }
      }
    );
  }

  private _getOsFromService(): void {
    const id = this._activatedRoute.snapshot.params['id'];
    this._osService.getOs(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(os => {
        this.os = os;
        if(this.os && this.os.photos) {
          this.previewPhotos = this.os.photos.map(photo => photo.url);
        }
      });
  }

  private _getEmuFromService(): void {
    const id = this._activatedRoute.snapshot.params['id'];
    this._emuService.getEmu(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(emu => {
        this._emu = emu;
        if(this.terminalOpened) {
          this._subscribeToSocket();
        }
        if(this.graphicOpened && this._emu.graphical) {
            this.novnc.initVNC(this._emu.graphical);
        }
      });
  }

  private _stopEmu(): void {
    if(!this._emu) return;
    this._emuService.stopEmu(this._emu.emulationId)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(_ => {
        this._emu = undefined;
      });
  }

}
