import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  @ViewChild('menuItems') menu: MenuItem[];
  items: MenuItem[];
  activeItem: MenuItem;
  constructor() {}

  ngOnInit(): void {
    this.items = [
      { id: '1', label: 'Môn học' },
      { id: '2', label: 'Sự kiện môn học' },
    ];
    this.activeItem = this.items[0];
  }
  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }
}