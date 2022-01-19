import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonFunction } from 'src/app/helper/common-function';
import { CommonObject } from 'src/app/helper/common-object';
import { AuthService } from 'src/app/services/auth.service';
import { StoreValueService } from 'src/app/services/store-value.service';

import jwt_decode from 'jwt-decode';
interface UserLogin {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserLogin = { email: 'trihtse130578@fpt.edu.vn',
  password: '123AAA@aaa', };
  isEnabledPassEys: boolean = false;
  constructor(
    private authService: AuthService,
    private storeValue: StoreValueService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.authService.login(this.user).subscribe(
      (res) => {
        console.log(res);
        const decode = jwt_decode(String(res.body));
        console.log('aaaa');
        console.log(decode);
        if (res.status === 200) {
          const decode = jwt_decode(String(res.body));
          console.log('aaaa');
          
          console.log(decode);
          
          // this.getUserInfor(decode['UserID']);
          // this.route.navigateByUrl('/Companyfirstlogin');
        }
      },
      (err) => {
        if (err.status === 404)
          this.form.controls['email'].setErrors({
            exist: true,
          });
        if (err.status === 400) {
          CommonFunction.createBadRequestErrors(
            err.error['errors'],
            this.form.controls
          );
        }
      }
    );
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.user).subscribe(
        (res) => {
          if (res.status === 200) {
            const decode = jwt_decode(String(res.body));
            // this.getUserInfor(decode['UserID']);
            // this.route.navigateByUrl('/Companyfirstlogin');
          }
        },
        (err) => {
          if (err.status === 404)
            this.form.controls['email'].setErrors({
              exist: true,
            });
          if (err.status === 400) {
            CommonFunction.createBadRequestErrors(
              err.error['errors'],
              this.form.controls
            );
          }
        }
      );
    } else {
      CommonFunction.validateAllFormFields(this.form);
    }
  }
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern(CommonObject.regexEmail),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
    ]),
    common: new FormControl(''),
  });
  get f() {
    return this.form.controls;
  }
  // getUserInfor(id) {
  //   this.request.get('users', id).subscribe((res) => {
  //     const data = {
  //       user: res.body,
  //       id: id,
  //     };
  //     this.storeValue.setLocalStorage('userInfor', data);
  //   });
  // }
}
