import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Injectable()
export class AuthGuard implements CanActivate {
  // ne pas effacer
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }*/
  constructor(private router: Router) { }
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      // HeaderComponent.isUserLoggedIn = true;
      HeaderComponent.updateUserStatus.next(true);
      return true;
    } else {
      // not logged in so redirect to home page
      this.router.navigateByUrl('/index', { queryParams: { path: '' } });
      return false;
    }
  }

}
