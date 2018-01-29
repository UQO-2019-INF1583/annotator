import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../shared/security/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
  userInfo: any = {};

  constructor(private router: Router, public authService: AuthService, public afAuth: AngularFireAuth) { }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
    .then((user) => {
      user.updateProfile({
        displayName: this.userInfo.firstName,
        photoURL: ""
      }).then(function() {
        // Update successful.

      }).catch(function(error) {
        console.log(error);
      });
      // added to get correctly the displayName
      this.authService.signIn(this.userInfo.email, this.userInfo.password);
      this.authService.logout();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });

  }
}
