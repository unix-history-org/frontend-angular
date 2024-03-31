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

@Component({
  selector: 'app-os-detail',
  templateUrl: './os-detail.component.html',
  styleUrls: ['./os-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OsDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  public os!: IOs;
  public previewPhotos!: URL[];
  public terminalOpened: boolean = false;
  public runTerminalText!: string;

  private _destroy$ = new Subject<void>();
  private _emu?: IEmu;
  private readonly _runTerminalClose: string = 'Закрыть терминал';

  private readonly _runTerminalOpen: string = 'Запустить терминал';
  private _isFirstTermInit: boolean = true;
  @ViewChild('term', {static: false}) child!: NgTerminal;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _osService: OsService,
    private readonly _emuService: EmuService
  ) {
    this.runTerminalText = this._runTerminalOpen;
  }

  public openCloseTerminal() {
    if(this.terminalOpened) {
      this._onCloseTerminal();
    }
    else {
      this._onOpenTerminal();
    }
  }

  public ngAfterViewChecked() {
    if(this.terminalOpened && this.child && this._isFirstTermInit) {
      this.child.onData()
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((input) => {
          // this.child.write(input);
          if(this._emu) this._emuService.sendToEmu(input);
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
        this.child.write(message);
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
        if(this.os.photos) {
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
        this._subscribeToSocket();
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
