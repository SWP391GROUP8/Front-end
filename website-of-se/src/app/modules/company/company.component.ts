import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../admin/admin.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  isActive: boolean = true;
  navigateList:NavigationLink[] = [];
  constructor() { }

  ngOnInit(): void {
    this.navigateList = [
      {
        id: 1,
        icon: 'fas fa-search-location',
        name: 'Quản lý tuyển dụng',
        link: '/company/manage-job',
        isHightLight: false,
      },
      {
        id: 2,
        icon: 'fas fa-file-alt',
        name: 'Xem danh sách CV',
        link: '/company/list-cv',
        isHightLight: false,
      },
    ];
  }
}
