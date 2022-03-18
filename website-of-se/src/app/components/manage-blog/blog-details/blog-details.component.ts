import { HttpParams } from '@angular/common/http';
import { ResourcePath } from './../../../helper/resource-path';
import { WebRequestService } from './../../../services/web-request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  comment: string = '';
  email: string;
  blog: BlogManagement = {
    authorId: null,
    commentId: null,
    content: null,
    id: null,
    reaction: null,
    status: null,
    title: null,
  };
  id: string;
  constructor(private route: ActivatedRoute,
    private request: WebRequestService,
    private storeValue: StoreValueService
    ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? null;
    this.email = this.storeValue.getLocalStorage('email') ?? null;
    this.getBlogDetails();
    this.getISReaction()
  }

  getBlogDetails(){
    let params = new HttpParams()
    .set('id', this.id);
    this.request.getWithQuery(params, ResourcePath.BLOG, ResourcePath.GET_BY_ID).subscribe(x => {
      this.blog = x.body as BlogManagement;
      console.log('Before: ' + this.blog.reaction);
    })
  }

  updateBlog(){
    console.log('Update: ' + this.blog.reaction);
    this.request.put(this.blog, {}, ResourcePath.BLOG).subscribe(x => {
      if (x.status === 200) {
        console.log('Success!');
      } else {
        console.log('Failed!');
      }
    });
  }

  getISReaction() {
    let params = new HttpParams().set('blogId',this.id).set('email',this.email);
    this.request.getWithQuery(params,ResourcePath.USER,ResourcePath.IS_REACTION).subscribe(x => {
      if (x.body === null) {
        this.isLike = false
      } else {
        this.isLike = x.body as boolean;
      }
    })
  }
  reaction() {
    let params = new HttpParams().set('blogId',this.id).set('email',this.email).set('isReaction',!this.isLike);
    this.request.put(null,params,ResourcePath.USER,ResourcePath.REACTION).subscribe(x =>{
      if (x.status === 200) {
        this.getISReaction();
        if (this.isLike === false) {
          this.blog.reaction += 1;
        } else {
          this.blog.reaction-= 1;
        }
      }
    })
  }
}
