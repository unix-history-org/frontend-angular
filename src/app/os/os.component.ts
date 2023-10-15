import { Component } from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

import { IOs } from '../../interfaces/IOs';
import { OsService } from '../../service/os.service';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent {
  public oss!: IOs[];

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _OsService: OsService,
  ) {}

  public ngOnInit(): void {
    this._getOssFromService();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getOssFromService(): void {
    this._OsService.getOss()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(oss => this.oss = oss);
  }

}
