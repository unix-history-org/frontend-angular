import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { IOs } from '../interfaces/ios';


@Injectable({
  providedIn: 'root'
})
export class OsService {

  private readonly _osUrl = 'api/os';

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public getOss(): Observable<IOs[]> {
    return this._httpClient.get<IOs[]>(this._osUrl)
      .pipe(
        catchError(
          this.handleError<IOs[]>('getOss', [])
        )
      );
  }

  public getOs(id: string): Observable<IOs> {
    return this._httpClient.get<IOs>(`${this._osUrl}/${id}`)
      .pipe(
        catchError(
          this.handleError<IOs>(`getOs id=${id}`)
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  }
