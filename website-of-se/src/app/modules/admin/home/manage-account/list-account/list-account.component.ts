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
    this.getListUser();
    this.statuses = [{ label: '1', value: 'Actived' }, { label: '2', value: 'Deactived' }]
  }
  openNew() {
    this.dialogType = 'create';
    this.product = { email: '', birthDay: '', name: '', address: '', status: '', role: { id: '', name: '' } };
    this.submitted = false;
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
    this.selectedRole = this.product.role;
    this.productDialog = true;

    console.log(this.selectedRole);
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
      this.request.put(updateAccount, null, ResourcePath.USER).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Cập nhật tài khoản thành công!',
          });
          this.productDialog = false;
          this.getListUser();
        }
      })
    } else {
      let createAccount = { email: this.email, password: this.password, confirmPassword: this.confirmPassword, roleId: this.selectedRole.id };
      this.request.post(createAccount, ResourcePath.USER).subscribe(x => {
        console.log(createAccount);
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tạo tài khoản thành công!',
          });
          this.productDialog = false;
          this.getListUser();
          this.refresh();
        }
      })
    }
  }
  getListUser() {
    this.request.get(ResourcePath.USER, ResourcePath.GET_ALL).subscribe(x => {
      this.products = x.body as Account[];
    })
  }
  refresh(){
    this.email = null;
    this.password = null;
    this.confirmPassword = null;
    this.selectedRole = null;
  }
}
