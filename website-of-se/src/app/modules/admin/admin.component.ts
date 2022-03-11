import { Component, OnInit } from '@angular/core';
import { NavigationLink } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isActive: boolean = true;
  navigateList:NavigationLink[] = [];
  constructor() { }

  ngOnInit(): void {
    this.navigateList = [
      {
        id: 1,
        icon: 'fa fa-users',
        name: 'Quản lý tài khoản',
        link: '/admin/manage-account',
        isHightLight: false,
      },
      {
        id: 2,
        icon: 'fab fa-blogger',
        name: 'Quản lý blog',
        link: '/admin/manage-blog',
        isHightLight: false,
      },
      {
        id: 3,
        icon: 'fas fa-book',
        name: 'Quản lý môn học',
        link: '/admin/manage-course',
        isHightLight: false,
      },
    ];
  }

}
