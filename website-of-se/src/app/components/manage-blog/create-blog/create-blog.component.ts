import { StoreValueService } from './../../../services/store-value.service';
import { BlogManagement } from './../blog.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  newBlog: BlogManagement;
  title: string;
  content: string;
  submitted: boolean = false;
  author: string;
  constructor(
    private route: Router,
    private messageService: MessageService,
    private request: WebRequestService,
    private storeValue: StoreValueService
  ) { }

  ngOnInit() {
    this.author = this.storeValue.getLocalStorage('email') ?? null;
  }

  submit() {
    this.submitted = true;
    if (this.title != null && this.content != null) {
      this.newBlog = { 
        ...this.newBlog,
        author: this.author,
        title: this.title, 
        content: this.content, 
        status: '' 
      };
      this.request.post(this.newBlog, ResourcePath.BLOG).subscribe(x => {
        if (x.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tạo bài viết thành công!',
          });
          this.submitted = false;
          this.refresh();
          this.route.navigate(['/blog']);
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Tạo bài viết không thành công!',
          });
        }
      })
    }
  }

  refresh() {
    this.title = null;
    this.content = null;
  }
}
