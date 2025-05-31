import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

@Component({
  selector: 'app-ng-novnc',
  templateUrl: './ng-novnc.component.html',
  styleUrls: [
    './ng-novnc.component.scss',
  ],
  standalone: true,
})
export class NgNovncComponent implements OnInit, OnDestroy{
  @ViewChild('vncContainer', { static: true }) vncContainer!: ElementRef;

  private _rfb?: RFB;

  constructor() {}

  public ngOnInit() {}

  public ngOnDestroy() {
    this.closeVNC();
  }

  public initVNC(url: string | URL) {
    if(url instanceof URL) url = url.toString();
    this._rfb = new RFB(
      this.vncContainer.nativeElement,
      url,
    );
  }

  public closeVNC() {
    if (this._rfb) {
      this._rfb.disconnect();
    }
  }
}
