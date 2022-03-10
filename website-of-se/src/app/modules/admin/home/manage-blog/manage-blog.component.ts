import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {
  
  @ViewChild('menuItems') menu: MenuItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  constructor() {}

  ngOnInit(): void {
    this.items = [
      { id: '1', label: 'Bài viết' },
      { id: '2', label: '...' },
    ];
    this.activeItem = this.items[0];
  }
  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

}
