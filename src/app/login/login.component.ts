// Rôle : contrôleur principal du module login (de la vue login.component.html).

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public afAuth: AngularFireAuth) {

  }

  ngOnInit() {
  }

  setMessage() {
    //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(e) {

  }

  logout(e) {

  }

  get authenticated(): boolean {
    return false;
  }

  get currentUserId(): string {
    return '';
  }

  googleLogin() {

  }

  facebookLogin() {
  }

  twitterLogin() {

  }

  getAuth() {
  }
}
