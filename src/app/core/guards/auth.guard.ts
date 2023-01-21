import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    const user = JSON.parse(this.authService.getCurrentUser());
    const token = this.authService.getCurrentToken();
    const loginValid = user.email + user.senha + user.nome;

    if (loginValid == token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
