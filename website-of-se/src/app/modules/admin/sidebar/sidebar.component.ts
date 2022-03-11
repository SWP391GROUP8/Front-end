import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationLink } from '../admin.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isActive: boolean = true;
  @Input() navigateList: NavigationLink[] = [];
  @Output() activeEvent = new EventEmitter<void>();
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    
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
