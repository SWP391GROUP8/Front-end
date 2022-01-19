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
  confirmPassword: string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserLogin = { email: null,
  password: null, confirmPassword: null};
  isEnabledPassEys: boolean = false;
  isEnabledRePassEys: boolean = false
  constructor(
    private authService: AuthService,
    private storeValue: StoreValueService,
    private route: Router,
    ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (
      this.user.confirmPassword !== this.user.password &&
      this.user.confirmPassword != null
    ) {
      this.form.controls['repassword'].setErrors({ match: true });
    }
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
