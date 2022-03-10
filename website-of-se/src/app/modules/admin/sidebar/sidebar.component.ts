import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

class NavigationLink {
  id: number;
  icon: string;
  name: string;
  link: string;
  isHightLight: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isActive: boolean = true;
  navigateList: NavigationLink[] = [];
  @Output() activeEvent = new EventEmitter<void>();
  constructor(private authService : AuthService) { }

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
  changePage(id: number) {
    this.navigateList.forEach((link) => {
      if (link.id === id) link.isHightLight = true;
      else link.isHightLight = false;
    });
  }
  isOpen() {
    this.activeEvent.emit();
  }
  logout() {
    this.authService.logout();
  }
}
