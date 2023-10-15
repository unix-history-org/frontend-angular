import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { IOs } from '../../interfaces/IOs';
import { OsService } from '../../service/os.service';

@Component({
  selector: 'app-os-detail',
  templateUrl: './os-detail.component.html',
  styleUrls: ['./os-detail.component.css']
})
export class OsDetailComponent {
  public os!: IOs;
  public galleryVisible: boolean = false;
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _osService: OsService
  ) {
  }

  public ngOnInit(): void {
    this.getOsFromService();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getOsFromService(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id')!;
    this._osService.getOs(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(os => {
        this.os = os;
      });
  }

}
