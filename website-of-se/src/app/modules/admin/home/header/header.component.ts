import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private auth: AuthService) {}
  isLogin: boolean;
  items: MenuItem[];
  ngOnInit(): void {
    if (this.auth.getAccessToken()) {
      this.isLogin = true;
    }
    this.items = [
      {
        label: 'Thông tin cá nhân',
        icon: 'pi pi-user',
        url: '/profile',
      },
      {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }
  login() {
    this.route.navigateByUrl('/login');
  }
  logout() {
    this.auth.logout();
  }
}
