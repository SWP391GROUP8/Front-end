import { CommonFunction } from './../helper/common-function';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
