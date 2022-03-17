import { StoreValueService } from './../../../../../services/store-value.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Blog } from '../../../admin.model';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  productDialog: boolean;
  currentUserId: string;

  products: Blog[] = [];

  product: Blog = { id: '', title: '', content: '', status: '', reaction: null, author: '' };
  statuses: any[]
  selectedProducts: Blog[];

  submitted: boolean;
  constructor(
    private messageService: MessageService,
    private cfService: ConfirmationService,
    private storeValue: StoreValueService,
    private request: WebRequestService
  ) { }

  ngOnInit(): void {
    this.getListBlog();
    this.currentUserId = this.storeValue.getLocalStorage('email');
    this.statuses = [{ label: '1', value: 'Actived' }, { label: '2', value: 'Deactived' }]
  }
  openNew() {
    this.product = { id: '', title: '', content: '', status: '', reaction: 0, author: '' };
    this.submitted = false;
    this.productDialog = true;
  }
  deleteSelectedProducts() {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa bài viết này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.request.delete(ResourcePath)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Xóa bài viết thành công!',
        });
      },
    });
  }
  async editProduct(product: Blog) {
    let params = new HttpParams()
      .set('id', product.id)
    const res = await this.request.getWithQuery(params, ResourcePath.BLOG, ResourcePath.GET_BY_ID).toPromise();
    this.product = res.body as Blog;
    this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  deleteProduct(product: Blog) {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa bài viết này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams()
          .set('id', product.id)
        this.request.deleteWithQuery(params, ResourcePath.BLOG).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xóa bài viết thành công!',
            });
            this.getListBlog();
          }
        })
      },
    });
  }
  saveProduct() {
    this.submitted = true;
    if (this.product.title.trim()) {
      if (this.product.id) {
        this.request.put(this.product, null, ResourcePath.BLOG).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cập nhật bài viết thành công!',
            });
          }
        })
      } else {
        // this.product.id = this.createId();
        this.product.author = this.currentUserId;
        this.request.post(this.product, ResourcePath.BLOG).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tạo bài viết thành công!',
            });
          }
        })

      }
      this.getListBlog();
      this.productDialog = false;
    }
    this.getListBlog();
  }
  getListBlog() {
    this.request.get(ResourcePath.BLOG).subscribe(x => {
      this.products = x.body as Blog[];
      console.log(this.products);
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
