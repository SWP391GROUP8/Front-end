import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class CommonRequestService {
  constructor(private request: WebRequestService) {}

  getById(path, id): Observable<any> {
    return this.request.get(`${path}/${id}`);
  }
  getAll(path): Observable<any> {
    return this.request.get(`${path}`);
  }
  post(data,path): Observable<any> {
    return this.request.post(data,`${path}`);
  }
  put(data,param,path): Observable<any> {
    return this.request.put(data,param,`${path}`);
  }
  delete(path): Observable<any> {
    return this.request.delete(`${path}`);
  }
 
}
