import {ActivatedRoute} from '@angular/router';
import {Component, ViewEncapsulation} from '@angular/core';

import {Subject, takeUntil} from 'rxjs';

import {IOs} from '../../interfaces/IOs';
import {OsService} from '../../service/os.service';

@Component({
  selector: 'app-os-detail',
  templateUrl: './os-detail.component.html',
  styleUrls: ['./os-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OsDetailComponent {
  public os!: IOs;
  public previewPhotos!: URL[];

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _osService: OsService
  ) {
  }

  public ngOnInit(): void {
    this._getOsFromService();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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

}
