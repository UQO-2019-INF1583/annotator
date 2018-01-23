// Rôle : contrôleur principal du module login (de la vue login.component.html).

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/security/auth.service';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userInfo: any = {};
  private isNotLoggedIn: boolean;

  constructor(public authService: AuthService,
              public router: Router) {
    localStorage.removeItem('errorAuth');
  }

  ngOnInit() {
    // reset login status
    this.isNotLoggedIn = this.authenticated();
    localStorage.removeItem('currentProjet');
    localStorage.removeItem('currentText');
  }

  login() {
    this.authService.signIn(this.userInfo.email, this.userInfo.password);
  }

  logout(e) {
    this.authService.logout();
  }

  authenticated() {
    if (!this.authService.authenticated()) {
      HeaderComponent.updateUserStatus.next(true);
      return false;
    }
    else
      return true;
  }

  /// Social Login

  signInWithGithub() {
    this.authService.githubLogin()
      .then(() => this.afterSignIn());
  }

  signInWithGoogle() {
    this.authService.googleLogin()
      .then((data) => this.afterSignIn());
  }

  facebookLogin() {
    this.authService.facebookLogin()
      .then((data) => this.afterSignIn());
  }

  twitterLogin() {

  }

  /// Shared

  private afterSignIn() {
   // Do after login stuff here, such router redirects, toast messages, etc.

   this.isNotLoggedIn = this.authenticated();
   this.router.navigate(['/']);
  }
}
