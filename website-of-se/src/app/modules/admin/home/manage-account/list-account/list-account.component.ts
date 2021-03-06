import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Account, Role } from '../../../admin.model';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  productDialog: boolean;
  isLoading: boolean = false;
  emailError: string;

  products: Account[] = [];
  roles: Role[] = [
    { id: '1', name: 'admin' },
    { id: '2', name: 'instructor' },
    { id: '3', name: 'student' },
    { id: '4', name: 'company' }
  ];
  selectedRole: Role;

  product: Account = { email: '', birthDay: '', name: '', address: '', status: '', role: { id: '', name: '' } };
  email: string;
  password: string;
  confirmPassword: string;
  statuses: any[]
  selectedProducts: Account[];
  dialogType: string;

  submitted: boolean;
  constructor(
    private messageService: MessageService,
    private cfService: ConfirmationService,
    private request: WebRequestService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getListUser();
    this.statuses = [{ label: '1', value: 'Actived' }, { label: '2', value: 'Deactived' }]
  }
  openNew() {
    this.dialogType = 'create';
    this.product = { email: '', birthDay: '', name: '', address: '', status: '', role: { id: '', name: '' } };
    this.submitted = false;
    this.selectedRole = null;
    this.productDialog = true;
  }
  deleteSelectedProducts() {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa những tài khoản này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.request.delete(ResourcePath)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
        });
      },
    });
  }
  async editProduct(product: Account) {
    this.dialogType = 'edit';
    const res = await this.request.get(ResourcePath.USER, ResourcePath.GET_BY_ID, product.email).toPromise();
    this.product = res.body as Account;
    // this.selectedRole = this.product.role;
    switch (this.product.role.name) {
      case 'ADMIN':
        this.selectedRole = this.roles[0];
        break;
      case 'INSTRUCTOR':
        this.selectedRole = this.roles[1];
        break;
      case 'STUDENT':
        this.selectedRole = this.roles[2];
        break;
      case 'COMPANY':
        this.selectedRole = this.roles[3];
        break;
    }
    this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  deleteProduct(product: Account) {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa tài khoản này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams()
          .set('email', product.email)
        this.request.deleteWithQuery(params, ResourcePath.USER).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xóa tài khoản thành công!',
            });
            this.getListUser();
          }
        })
      },
    });
  }
  saveProduct() {
    this.submitted = true;
    delete this.product.role;
    if (this.dialogType === 'edit') {
      let updateAccount = { ...this.product, roleId: this.selectedRole.id };
      this.request.put(updateAccount, null, ResourcePath.USER, ResourcePath.USER_UPDATE).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Cập nhật tài khoản thành công!',
          });
          this.submitted = false;
          this.productDialog = false;
          this.getListUser();
        }
      })
    } else {
      if (this.email.split('@')[1] !== 'fpt.edu.vn') {
        this.emailError = "Email không đúng format (fpt.edu.vn).";
        return;
      }
      let createAccount = { email: this.email, password: this.password, confirmPassword: this.confirmPassword, roleId: this.selectedRole.id };
      this.request.post(
        createAccount,
        ResourcePath.USER,
        ResourcePath.USER_CREATE).subscribe(
          (x) => {
            console.log(x.status);
            if (x.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Tạo tài khoản thành công!',
              });
              this.submitted = false;
              this.productDialog = false;
              this.getListUser();
              this.refresh();
            }
          },
          (err) => {
            if (err.status === 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Tạo tài khoản không thành công!',
              });
              this.emailError = "Email đã tồn tại.";
            }
          }
        )
    }
  }
  getListUser() {
    this.request.get(ResourcePath.USER, ResourcePath.GET_ALL).subscribe(x => {
      this.products = x.body as Account[];
      this.products.reverse();
      this.isLoading = false;
    })
  }
  refresh() {
    this.email = null;
    this.password = null;
    this.confirmPassword = null;
    this.selectedRole = null;
  }
}
