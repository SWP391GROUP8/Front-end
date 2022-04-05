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
  user: UserLogin = { email: null,
  password: null };
  isEnabledPassEys: boolean = false;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private storeValue: StoreValueService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigateByUrl('/home')
    }
  }
  onSubmit() {
    this.isLoading = true;
    if (this.user.email !== null) {
      if (this.user.email.split('@')[1] === 'fpt.edu.vn' || this.user.email.split('@')[1] === 'fe.edu.vn') {
      } else {
        this.form.controls['email'].setErrors({
          isFPT: true,
        });
      }
    }
    if (this.form.valid) {
      this.authService.login(this.user).subscribe(
        (res) => {
          if (res.status === 200) {
            const decode = jwt_decode(String(res.body['token']));
            this.storeValue.setLocalStorage('role', res.body['role']);
            this.storeValue.setLocalStorage('email', decode['sub']);
            if (res.body['role'] === 'COMPANY') {
              this.route.navigateByUrl('/company');
            }
            if (res.body['role'] === 'ADMIN') {
              this.route.navigateByUrl('/admin');
            }
            if (res.body['role'] === 'STUDENT' || res.body['role'] === 'INSTRUCTOR') {
              this.route.navigateByUrl('/home');
            }
            this.isLoading = false;
          }
        },
        (err) => {
          if (err.status === 400) {
            if (err.error === 'Email not exist') {
              this.form.controls['email'].setErrors({
                exist: true,
              });
              this.isLoading = false;
            }
            
            this.form.controls['password'].setErrors({
              valid: true,
            });
            this.isLoading = false;
          }
        }
      );
    } else {
      this.isLoading = false;
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
  getUserInfo(){

  }
}
