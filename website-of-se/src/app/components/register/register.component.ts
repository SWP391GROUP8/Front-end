import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonFunction } from 'src/app/helper/common-function';
import { CommonObject } from 'src/app/helper/common-object';
import { AuthService } from 'src/app/services/auth.service';
import { StoreValueService } from 'src/app/services/store-value.service';
import jwt_decode from 'jwt-decode';
import { WebRequestService } from 'src/app/services/web-request.service';
import { ResourcePath } from 'src/app/helper/resource-path';
import { MessageService } from 'primeng/api';
interface UserLogin {
  email: string;
  password: string;
  confirmPassword: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: UserLogin = { email: null, password: null, confirmPassword: null };
  isEnabledPassEys: boolean = false;
  isEnabledRePassEys: boolean = false;
  constructor(
    private request: WebRequestService,
    private auth: AuthService,
    private route: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.route.navigateByUrl('/home');
    }
  }
  onSubmit() {
    if (
      this.user.confirmPassword !== this.user.password &&
      this.user.confirmPassword != null
    ) {
      this.form.controls['repassword'].setErrors({ match: true });
    }
    if (this.user.email !== null) {
      if (this.user.email.split('@')['1'] !== 'fpt.edu.vn') {
        this.form.controls['email'].setErrors({ isStudent: true });
      }
    }
    if (this.form.valid) {
      const data = {
        confirmPassword: this.user.confirmPassword,
        email: this.user.email,
        password: this.user.password,
        roleId: '3',
      };
      this.request
        .post(data, ResourcePath.USER, ResourcePath.CREATE_USER)
        .subscribe(
          (x) => {
            if (x.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Tạo tài khoản thành công!',
                life: 3000,
              });
              this.route.navigateByUrl('/login');
            }
          },
          (err) => {
            if (err.status === 400) {
              this.form.controls['email'].setErrors({ exist: true });
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
      Validators.pattern(CommonObject.regexPassword),
    ]),
    repassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
    ]),
  });
  get f() {
    return this.form.controls;
  }
}
