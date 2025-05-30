import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';

import { IEmu } from '../interfaces/iemu';


@Injectable({
  providedIn: 'root'
})
export class EmuService implements OnDestroy {
  private readonly _emu = 'api/emu';
  private _socket$?: WebSocketSubject<any>;
  private readonly _wsProtocol = (window.location.protocol === 'https:') ? 'wss' : 'ws';
  private readonly _emuWsBaseUrl = `${this._wsProtocol}://${window.location.host}`;
  private readonly _timer: ReturnType<typeof setInterval>;

  constructor(
    private readonly _httpClient: HttpClient,
  ) {
    this._timer = setInterval(() => {
      this._pingEmu();
    }, 1000);
  }

  public ngOnDestroy(): void {
    clearInterval(this._timer);
  }


  public getEmu(id: string): Observable<IEmu> {
    return this._httpClient.get<IEmu>(`${this._emu}/start/${id}`)
      .pipe(
        catchError(
          this.handleError<IEmu>(`getEmu id=${id}`)
        )
      );
  }

  public stopEmu(id: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this._emu}/stop/${id}`)
      .pipe(
        catchError(
          this.handleError<boolean>(`getEmu id=${id}`)
        )
      );
  }

  public getEmulationWebSocket(url: string): WebSocketSubject<any> {
    this._socket$ = webSocket({
      url: `${this._emuWsBaseUrl}/${url}`,
      deserializer: (e) => e.data,
      serializer: (value) => value,
    });
    return this._socket$;
  }

  public sendToEmu(data: string): void {
    if(!this._socket$) return;
    this._socket$.next(`0:${data}`);
  }

  private _pingEmu(): void {
    if(!this._socket$) return;
    this._socket$.next(`1:ping`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
