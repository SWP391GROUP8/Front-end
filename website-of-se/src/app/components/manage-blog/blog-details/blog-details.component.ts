import { HttpParams } from '@angular/common/http';
import { ResourcePath } from './../../../helper/resource-path';
import { WebRequestService } from './../../../services/web-request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { is } from 'date-fns/locale';
import { BlogManagement } from '../blog.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  isLike: boolean = false;
  comment: string = '';
  blog: BlogManagement = {
    authorId: null,
    commentId: null,
    content: null,
    id: null,
    reaction: null,
    status: null,
    title: null,
  };
  constructor(private route: ActivatedRoute,
    private request: WebRequestService
    ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getBlogDetails(id);
  }

  getBlogDetails(id: string){
    let params = new HttpParams()
    .set('id', id);
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

  reaction() {
    if (this.isLike === false) {
      this.isLike = true;
      this.blog.reaction += 1;
      // this.updateBlog();
    } else {
      this.isLike = false;
      this.blog.reaction-= 1;
    }
  }
}
