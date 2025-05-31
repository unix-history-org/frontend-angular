import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitleGroup,
  MatCardTitle,
  MatCardSubtitle,
} from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';

import { IOs } from '../../interfaces/ios';
import { OsService } from '../../service/os.service';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    RouterLink,
  ]
})
export class OsComponent implements OnDestroy, OnInit {

  public oss!: IOs[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _osService: OsService,
  ) {}

  public ngOnInit(): void {
    this._getOssFromService();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getOssFromService(): void {
    this._osService.getOss()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(oss => this.oss = oss);
  }

}
