import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogManagement } from '../blog.model';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  listBlog: BlogManagement[] = [
    {
      authorId: null,
      commentId: null,
      content: null,
      id: null,
      reaction: null,
      status: null,
      title: null,
    },
  ];
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getListBlog();
  }
  getListBlog() {
    return (this.listBlog = [
      {
        authorId: 'Tri',
        commentId: 'null',
        content: 'Test Contentttttttttttttttttt',
        id: '1',
        reaction: 5,
        status: 'Open',
        title: 'Test Title',
      },
      {
        authorId: 'TriHT',
        commentId: 'null',
        content: 'Test Contentttttttttttttttttt',
        id: '2',
        reaction: 6,
        status: 'Open',
        title: 'Test Title 2',
      },
      {
        authorId: 'TriHT',
        commentId: 'null',
        content: 'Test Contentttttttttttttttttt',
        id: '3',
        reaction: 0,
        status: 'Open',
        title: 'Test Title 3',
      },
      {
        authorId: 'TriHT',
        commentId: 'null',
        content: 'Test Contentttttttttttttttttt',
        id: '4',
        reaction: 10,
        status: 'Open',
        title: 'Test Title 4',
      },
    ]);
  }
  navigateToCustomerDetail(id: string) {
    this.route.navigate(['/blog', id]);
  }
}
