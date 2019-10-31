// Rôle : indique au routeur de l’application si la navigation vers une route donnée
// est autorisée, et ce, selon le status d’authentification de l’utilisateur.

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
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  // détermine si la navigation vers une route donnée est autorisée.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    let active = false;
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      active = true;   /*
    } else if (this.checkLogin(url) || this.authService.authenticated) {
      active = true;  */
    }
    console.log(active, 'canAc');
    return active;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // détermine si une composante peut être chargée
  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  // détermine le status d'authentification d'un utilisateur donné
  checkLogin(url: string): boolean {
    //    if (this.authService.isLoggedIn || this.authService.authenticated) { return true; }

    // Store the attempted URL for redirecting
    //    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
