import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { ResourcePath } from '../helper/resource-path';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = localStorage.getItem('Authorization') ? true : false;
  role: string = localStorage.getItem('role') ?? null;
  constructor(private router: Router, private request: WebRequestService) {}
  isLoggedIn() {
    return this.isLogin;
  }
  login(data: any) {
    return this.request
      .post(data, ResourcePath.AUTH, ResourcePath.LOGIN)
      .pipe(
        shareReplay(),
        tap((res) => {
          this.isLogin = true;
          this.role = String(res.body['role']);
          this.setSession(String(res.body['token']));
        })
      );
  }
  logout() {
    this.removeSession();
    this.isLogin = false;
    this.router.navigateByUrl('/login');
  }
  getRole() {
    return this.role;
  }
  getAccessToken() {
    return localStorage.getItem('Authorization');
  }
  setAccessToken(accessToken: string) {
    localStorage.setItem('Authorization', accessToken);
  }
  private setSession(accessToken: string) {
    localStorage.setItem('Authorization', accessToken);
  }
  private removeSession() {
    localStorage.removeItem('Authorization');
  }
}
