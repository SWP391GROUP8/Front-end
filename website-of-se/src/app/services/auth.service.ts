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
          this.setSession(String(res.body));
        })
      );
  }

  // checkResetPasswordField(email, verificationCode) {
  //   return this.request.post(
  //     { email, verificationCode },
  //     ResourcePath.USER,
  //     ResourcePath.CHECK_RESET_PASSWORD_DATA
  //   );
  // }


  // forgotPassword(email) {
  //   return this.request.put(
  //     { email },
  //     {},
  //     ResourcePath.USER,
  //     ResourcePath.FORGOT_PASSWORD
  //   );
  // }
  // resetPassword(email, verificationCode, newPassword) {
  //   return this.request.put(
  //     {
  //       email,
  //       verificationCode,
  //       newPassword,
  //     },
  //     {},
  //     ResourcePath.USER,
  //     ResourcePath.RESET_PASSWORD
  //   );
  // }
  logout() {
    this.removeSession();
    this.isLogin = false;
    this.router.navigateByUrl('/login');
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
