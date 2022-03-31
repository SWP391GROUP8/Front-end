import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { ResourcePath } from './../../../helper/resource-path';
import { WebRequestService } from './../../../services/web-request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { is } from 'date-fns/locale';
import { BlogManagement } from '../blog.model';
import { StoreValueService } from 'src/app/services/store-value.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  isLike: boolean = false;
  isLoading: boolean = false;
  comment: string = '';
  email: string;
  isEditable: boolean = false;
  blog: BlogManagement = {
    author: null,
    commentId: null,
    content: null,
    id: null,
    reaction: null,
    status: null,
    title: null,
  };
  id: string;
  items: MenuItem[];
  productDialog: boolean = false;
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private cfService: ConfirmationService,
    private request: WebRequestService,
    private storeValue: StoreValueService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? null;
    this.email = this.storeValue.getLocalStorage('email') ?? null;
    this.getBlogDetails();
    this.getISReaction();
    this.items = [{
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.editProduct();
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        this.deleteBlog();
      }
    }
    ];
    this.isLoading = true;
  }

  getBlogDetails() {
    let params = new HttpParams()
      .set('id', this.id);
    this.request.getWithQuery(params, ResourcePath.BLOG, ResourcePath.GET_BY_ID).subscribe(x => {
      this.blog = x.body as BlogManagement;
      this.isEditable = this.email === this.blog.author;
      this.isLoading = false;
    })
  }

  updateBlog() {
    this.submitted = true;
    this.request.put(this.blog, {}, ResourcePath.BLOG).subscribe(x => {
      if (x.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Cập nhật bài viết thành công!',
        });
        this.submitted = true;
        this.productDialog = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Lỗi hệ thống',
        });
      }
    });
  }

  deleteBlog() {
    this.cfService.confirm({
      message: 'Bạn có chắc muốn xóa bài viết này?',
      header: 'Xóa bài viết',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let params = new HttpParams()
          .set('id', this.blog.id)
        this.request.deleteWithQuery(params, ResourcePath.BLOG).subscribe(x => {
          if (x.status === 200) {
            this.router.navigateByUrl('/blog');
          }
        })
      },
    });
  }

  getISReaction() {
    let params = new HttpParams().set('blogId', this.id).set('email', this.email);
    this.request.getWithQuery(params, ResourcePath.USER, ResourcePath.IS_REACTION).subscribe(x => {
      if (x.body === null) {
        this.isLike = false
      } else {
        this.isLike = x.body as boolean;
      }
    })
  }

  reaction() {
    let params = new HttpParams().set('blogId', this.id).set('email', this.email).set('isReaction', !this.isLike);
    this.request.put(null, params, ResourcePath.USER, ResourcePath.REACTION).subscribe(x => {
      if (x.status === 200) {
        this.getISReaction();
        if (this.isLike === false) {
          this.blog.reaction += 1;
        } else {
          this.blog.reaction -= 1;
        }
      }
    })
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  editProduct() {
    this.productDialog = true;
  }
}
