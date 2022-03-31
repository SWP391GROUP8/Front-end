import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
interface ChangePassword {
  newPass: string;
  confirmPass: string;
  oldPass: string;
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() email: string;
  @Output() isChange = new EventEmitter();

  changePass: ChangePassword = {
    confirmPass: null,
    newPass: null,
    oldPass: null,
  };
  constructor(private request: WebRequestService,private messageService: MessageService) {}

  ngOnInit(): void {
  }
  changePassword() {
    let params = new HttpParams()
      .set('email', this.email)
      .set('newPassword', this.changePass.newPass)
      .set('comfirmNewPassword', this.changePass.confirmPass)
      .set('oldPassword', this.changePass.oldPass);
    this.request
      .postWithQuery(
        params,
        null,
        ResourcePath.USER,
        ResourcePath.CHANGE_PASSWORD
      )
      .subscribe((x) => {
        if (x.status===200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đổi mật khẩu thành công!',
            life: 3000,
          });
          this.changePass = {
            confirmPass: null,
            newPass: null,
            oldPass: null,
          };
          this.isChange.emit(false);
        }
      });
  }
  cancel() {
    this.isChange.emit(false);
  }
}
