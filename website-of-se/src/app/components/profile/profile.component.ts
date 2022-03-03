import { Component, OnInit } from '@angular/core';
import { is } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { UserInfor } from 'src/app/models/common.model';
import { StoreValueService } from 'src/app/services/store-value.service';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfor: UserInfor = {
    address: null,
    birthDay: null,
    email: null,
    name: null,
    phone: null,
    status: null,
    roleId: null,
    password: '123AAA@aaa',
  };
  isEdit: boolean = true;
  email: string = this.storeValue.getLocalStorage('email') ?? null;
  constructor(
    private storeValue: StoreValueService,
    private request: WebRequestService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    if (this.email !== null) {
      this.getUserByEmail();
    }
  }
  editProfile() {
    this.userInfor['role'] = undefined;
    const data = {
      ...this.userInfor,
      password: '123AAA@aaa',
    };
    this.request.put(data, null, ResourcePath.USER).subscribe((x) => {
      if (x.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành Công',
          detail: 'Cập nhật thành công',
        });
      }
    });
    this.isEdit = true;
  }
  getUserByEmail() {
    this.request
      .get(ResourcePath.USER, ResourcePath.GET_BY_ID, this.email)
      .subscribe((x) => {
        if (x.status === 200) {
          this.userInfor = x.body;
          this.userInfor.roleId = x.body['role']['id'];
        }
      });
  }
}
