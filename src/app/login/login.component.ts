// Rôle : contrôleur principal du module login (de la vue login.component.html).

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../shared/security/auth.service";
import { HeaderComponent } from "../shared/components/header/header.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit {
  userInfo: any = {};
  errorMessage = "";
  loading = false;

  constructor(public authService: AuthService, public router: Router) {
    localStorage.removeItem("errorAuth");
  }

  private handleError(error: Error): void {
    this.loading = false;
    this.errorMessage = error.message;
  }

  ngOnInit() {
    // reset login status
    localStorage.removeItem("currentProjet");
    localStorage.removeItem("currentText");
  }

  login() {
    this.loading = true;
    this.authService
      .signIn(this.userInfo.email, this.userInfo.password)
      .then(() => {
        this.afterSignIn();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  logout(e) {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  authenticated() {
    return HeaderComponent.currUsername !== "";
  }

  /// Social Login

  signInWithGithub() {
    this.loading = true;
    this.authService
      .githubLogin()
      .then(() => {
        this.afterSignIn();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  signInWithGoogle() {
    this.loading = true;
    this.authService
      .googleLogin()
      .then(() => {
        this.afterSignIn();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  facebookLogin() {
    this.loading = true;
    this.authService
      .facebookLogin()
      .then(() => {
        this.afterSignIn();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  signInWithTwitterLogin() {
    this.authService.twitterLogin()
     .then((data) => this.afterSignIn());
  }

  /// Shared

  private afterSignIn() {
    this.router.navigate(["/"]);
  }
}

