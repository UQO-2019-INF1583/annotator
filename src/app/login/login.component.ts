// Rôle : contrôleur principal du module login (de la vue login.component.html).

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


import { AuthService } from '../shared/auth.service';

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
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(e) {

  }

  logout(e) {

  }

  get authenticated(): boolean {
  }

  get currentUserId(): string {
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
