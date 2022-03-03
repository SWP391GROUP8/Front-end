import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogManagement } from './blog.model';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss'],
})
export class ManageBlogComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
  }
}
