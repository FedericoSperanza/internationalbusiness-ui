import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private options = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
    withCredentials: false,
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `${error.status}\rMessage: ${error.message}`;
    }
    return throwError(errorMsg);
  }

  public getTableData(skuData: string) {
    if (skuData) {
      const apiUrl = environment['transactions']['api'] + skuData;
      return this.http
        .get(apiUrl, this.options)
        .pipe(retry(1), catchError(this.handleError));
    } else {
      throw httpError(400, 'Invalid query structure.');
    }
  }
}
function httpError(arg0: number, arg1: string) {
  throw new Error('Function not implemented.');
}
