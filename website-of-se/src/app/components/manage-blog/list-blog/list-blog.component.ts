import { ResourcePath } from 'src/app/helper/resource-path';
import { WebRequestService } from 'src/app/services/web-request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogManagement } from '../blog.model';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  listBlog: BlogManagement[] = [];
  isLoading: boolean = false;
  constructor(
    private route: Router,
    private request: WebRequestService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getListBlog();
  }
  getListBlog() {
    this.request.get(ResourcePath.BLOG).subscribe(x => {
      this.listBlog = x.body as BlogManagement[];
      this.listBlog.reverse();
      this.isLoading = false;
    })
  }
  navigateToBlogDetail(id: string) {
    this.route.navigate(['/blog', id]);
  }

  navigateToCreateBlog() {
    this.route.navigateByUrl('/blog/create');
  }
}
