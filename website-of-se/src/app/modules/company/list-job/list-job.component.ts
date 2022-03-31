import { StoreValueService } from './../../../services/store-value.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from './../../admin/admin.model';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./list-job.component.scss']
})
export class ListJobComponent implements OnInit {
  productDialog: boolean;
  currentUserId: string;
  products: Job[] = [];
  editingProduct: any;

  product: Job = { 
    id: '',
    title: '',
    content: '',
    createDate: '',
    status: '',
    city: '',
    address: '',
    mail: '',
    phoneNumber: '',
    userId: '', 
  };
  listStatus: any[] = [
    { id: 'Hiring', name: 'Đang tuyển dụng'},
    { id: 'Closed', name: 'Đã đóng đơn'},
  ];
  status: any;
  selectedProducts: Job[];

  submitted: boolean;
  constructor(
    private messageService: MessageService,
    private cfService: ConfirmationService,
    private request: WebRequestService,
    private storeValue: StoreValueService,
  ) { }

  ngOnInit(): void {
    this.getListJob();
    this.currentUserId = this.storeValue.getLocalStorage('email');
  }
  openNew() {
    this.product = { 
      id: '',
      title: '',
      content: '',
      createDate: '',
      status: '',
      city: '',
      address: '',
      mail: '',
      phoneNumber: '',
      userId: this.currentUserId, 
    };
    this.submitted = false;
    this.productDialog = true;
  }
  deleteSelectedProducts() {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa công việc này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.request.delete(ResourcePath)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Xóa công việc thành công!',
        });
      },
    });
  }
  async editProduct(product: Job) {
    let params = new HttpParams()
      .set('id', product.id);
    const res = await this.request.getWithQuery(params, ResourcePath.JOB, ResourcePath.GET_BY_ID).toPromise();
    this.editingProduct = res.body as Job;
    this.product = res.body as Job;
    this.status = product.status;
    this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  deleteProduct(product: Job) {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa công việc này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams()
          .set('id', product.id)
        this.request.deleteWithQuery(params, ResourcePath.JOB).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xóa công việc thành công!',
            });
            this.getListJob();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Xóa công việc thất bại!',
            });
          }
        })
      },
    });
  }
  saveProduct() {
    this.submitted = true;
    if (this.product.title.trim()) {
      this.product.status = this.status.id;
      if (this.product.id) {
        this.product.userId = this.editingProduct.user.email;
        this.request.put(this.product, null, ResourcePath.JOB).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cập nhật công việc thành công!',
            });
            this.getListJob();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Cập nhật công việc thất bại!',
            });
          }
        })
      } else {
        this.product.id = this.createId();
        this.request.post(this.product, ResourcePath.JOB).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tạo công việc thành công!',
            });
            this.getListJob();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Tạo công việc thất bại!',
            });
          }
        })

      }
      this.productDialog = false;
    }
    this.getListJob();
  }
  getListJob() {
    this.status = null;
    this.request.get(ResourcePath.JOB).subscribe(x => {
      this.products = x.body as Job[];
      this.products.reverse();
    })
  }
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
