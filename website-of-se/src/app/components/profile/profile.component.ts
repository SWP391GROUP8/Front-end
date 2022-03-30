import { Role } from './../../modules/admin/admin.model';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  isChangePassword: boolean = false;
  isLoading: boolean = false;
  userInfor: UserInfor = {
    address: null,
    birthDay: null,
    email: null,
    name: null,
    phone: null,
    status: null,
    roleId: null,
  };
  currentRole: string;
  roles: Role[] = [
    { id: '1', name: 'admin' },
    { id: '2', name: 'instructor' },
    { id: '3', name: 'student' },
    { id: '4', name: 'company' }
  ];
  isEdit: boolean = true;
  email: string = this.storeValue.getLocalStorage('email') ?? null;
  constructor(
    private storeValue: StoreValueService,
    private request: WebRequestService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    if (this.email !== null) {
      this.getUserByEmail();
    }
  }
  editProfile() {
    this.userInfor['role'] = undefined;
    const data = {
      ...this.userInfor,
    };
    this.request
      .put(data, null, ResourcePath.USER, ResourcePath.USER_UPDATE)
      .subscribe((x) => {
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
        switch (this.userInfor.roleId) {
          case '1':
            this.currentRole = this.roles[0].name;
            break;
          case '2':
            this.currentRole = this.roles[1].name;
            break;
          case '3':
            this.currentRole = this.roles[2].name;
            break;
          case '4':
            this.currentRole = this.roles[3].name;
            break;
        }
        this.isLoading = false;
      });
  }
  Cancel() {
    this.isEdit = true;
    this.getUserByEmail();
  }
  changePassword(event) {
    this.isChangePassword = event;
  }
}
