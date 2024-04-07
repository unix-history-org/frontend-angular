import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

@Component({
  selector: 'app-ng-novnc',
  templateUrl: './ng-novnc.component.html',
  styleUrls: [
    './ng-novnc.component.css',
  ]
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
      url, //'ws://10.4.3.2:8080/api/emu/652be4720537bb916db5790e/00000000-0000-0000-0000-000000000000/gui',
    );
  }

  public closeVNC() {
    if (this._rfb) {
      this._rfb.disconnect();
    }
  }
}
