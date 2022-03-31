import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  role: string = localStorage.getItem('role') ?? null;
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {

      if (route.data.role && !route.data.role.includes(this.authService.getRole().replace(/['"]+/g, ''))) {
        console.log(this.authService.getRole());
        switch (this.authService.getRole()) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'COMPANY':
            this.router.navigate(['/company']);
            break;
          case 'INSTRUCTOR' || 'STUDENT':
            this.router.navigate(['/home']);
            break;
          default:
            this.router.navigate(['/not-allowed']);
            break;
        }
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
