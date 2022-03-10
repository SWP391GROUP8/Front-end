import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

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
