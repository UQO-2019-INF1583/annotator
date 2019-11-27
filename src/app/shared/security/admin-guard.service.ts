import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { AuthService } from './auth.service';

import { switchMap } from 'rxjs/operators';

import { Role, User } from '../user.model';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AdminGuardService implements CanActivate {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    }));
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAdmin = await this.authService.isAdministrator();

    if (isAdmin) {
      return true;
    }

    this.router.navigateByUrl('/index', { queryParams: { path: '' } });
    return false;
  }
}
