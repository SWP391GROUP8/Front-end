import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss']
})
export class ManageJobComponent implements OnInit {

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
