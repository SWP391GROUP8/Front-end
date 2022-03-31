import { CommonFunction } from './../helper/common-function';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://swp391-lms.herokuapp.com/api/';
  }
  get(...path) {
    return this.http.get(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      { observe: 'response' }
    );
  }
  
  post(payload: object, ...path) {
    return this.http.post(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      payload
      ,
      {
        observe: 'response',
      }
    );
  }
  postWithQuery(params ,payload: object, ...path) {
    return this.http.post(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      payload
      ,
      {
        params: params,
        observe: 'response',
        responseType: 'text'
      }
    );
  }
  downloadFile(url: string, fileName: string): Observable<number> {
    return new Observable(observer => {
        this.requestDownload(url).subscribe((event: HttpEvent<Blob>) => {
            if (event.type === HttpEventType.DownloadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                observer.next(percentDone);
            }
            if (event.type === HttpEventType.Response) {
                observer.complete();
            }
        });
    }
    );
}


private requestDownload(url: string): Observable<HttpEvent<Blob>> {
    return this.http.get(url, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
    })
}
  postWithTextResponse(payload: object, ...path) {
    return this.http.post(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      payload
      ,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
  delete(...path) {
    return this.http.delete(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      {
        observe: 'response',
      }
    );
  }
  deleteWithQuery(params,...path) {
    return this.http.delete(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      { observe: 'response', params: params, responseType: 'text'}
    );
  }
  getWithQuery(params, ...path) {
    return this.http.get(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      { observe: 'response', params: params }
    );
  }
  put(payload: object, params, ...path) {
    return this.http.put(
      this.ROOT_URL + CommonFunction.convertPathArrToString(path),
      payload,
      {
        params: params,
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
