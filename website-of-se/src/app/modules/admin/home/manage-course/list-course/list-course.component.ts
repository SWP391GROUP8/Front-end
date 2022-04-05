import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Course } from '../../../admin.model';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./list-course.component.scss'],
})
export class ListCourseComponent implements OnInit {
  productDialog: boolean;
  isLoading: boolean = false;
  listPrecourse: any[] = [];

  products: Course[] = [];

  product: Course = { id: '', author: '', code: '', name: '', status: '' , preCourse: null};
  statuses: any[]
  selectedProducts: Course[];
  email: string;
  submitted: boolean;
  constructor(
    private messageService: MessageService,
    private cfService: ConfirmationService,
    private request: WebRequestService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getListCourse();
    this.email = localStorage.getItem('email').replace(/\"/g,"") ?? null;
    this.statuses = [{ label: '1', value: 'Actived' }, { label: '2', value: 'Deactived' }];
  }
  openNew() {
    this.product = { id: '', author: '', code: '', name: '', status: '' ,preCourse: null};
    
    this.submitted = false;
    this.productDialog = true;
    console.log(
      this.product.preCourse);
    
  }
  deleteSelectedProducts() {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa môn học này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.request.delete(ResourcePath)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }
  async editProduct(product: Course) {
    let params = new HttpParams()
      .set('id', product.id)
    const res = await this.request.getWithQuery(params, ResourcePath.COURSE, ResourcePath.GET_BY_ID).toPromise();
    this.product = res.body as Course;
    this.getPreCourse();
    
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  deleteProduct(product: Course) {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa môn học này?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams()
          .set('id', product.id)
        this.request.deleteWithQuery(params, ResourcePath.COURSE).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xóa môn học thành công!',
              life: 3000,
            });
            this.getListCourse();
          }
        }, err => {
          if (err.status===500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Môn học đang có sự kiện diễn ra! Không thể xóa môn học này!',
              life: 3000,
            });
          }
          
        });
      },
    });
  }
  saveProduct() {
    this.submitted = true;
    if (this.product.name.trim()) {
      this.product.author = this.email;
      if (this.product.id) {
        let params = new HttpParams().set('courseId',this.product.id).set('preCourseId',this.product.preCourse.id);
        this.request.postWithQuery(params,null,ResourcePath.COURSE,ResourcePath.ADD_PRE_COURSE).subscribe(x => {
          console.log(x);
          
        })
        this.request.put(this.product, null, ResourcePath.COURSE).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cập nhật môn học thành công!',
              life: 3000,
            });
            this.getListCourse();
          }
        })
      } else {
        this.product.status = 'ACTIVE';
        this.product.id = this.createId();
        let params = new HttpParams().set('courseId',this.product.id).set('preCourseId',this.product.preCourse.id);
        this.request.postWithQuery(params,null,ResourcePath.COURSE,ResourcePath.ADD_PRE_COURSE).subscribe(x => {
          console.log(x);
        })
        this.request.post(this.product, ResourcePath.COURSE).subscribe(x => {
          if (x.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tạo môn học thành công!',
              life: 3000,
            });
            this.getListCourse();
          }
        })
      }
      this.productDialog = false;
    }
  }
  getListCourse() {
    this.request.get(ResourcePath.COURSE, ResourcePath.GET_ALL).subscribe(x => {
      this.products = x.body as Course[];
      this.listPrecourse = x.body as Course[];
      this.isLoading = false;
      this.products.forEach(x=> {
      })
    })
  }
  getPreCourse() {
    let params = new HttpParams().set('courseId',this.product.id)
    this.request.getWithQuery(params,ResourcePath.COURSE, ResourcePath.PRE_COURSE).subscribe(x => {
      this.product.preCourse = x.body[0] as Course;
      
      this.productDialog = true;
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
