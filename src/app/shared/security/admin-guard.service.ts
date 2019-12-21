import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  // Fonction qui dit à la page si elle doit s'afficher ou non
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAdmin = await this.authService.isAdministrator();

    if (isAdmin) {
      return true;
    }

    // L'utilisateur n'est pas un administrateur, il ne faut pas afficher la page et le retourner à index
    this.router.navigateByUrl('/index', { queryParams: { path: '' } });
    return false;
  }
}
