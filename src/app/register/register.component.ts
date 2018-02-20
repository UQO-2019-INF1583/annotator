import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore
} from 'angularfire2/firestore';

import { AuthService } from '../shared/security/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
  userInfo: any = {};
  errorMessage: string = '';

  constructor(private router: Router, public authService: AuthService, public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
    .then((user) => {
      user.updateProfile({
        displayName: this.userInfo.firstName,
        photoURL: ""
      }).then(() => {
        // Update successful. Add the user to ..
      }).catch(function(error) {
        console.log(error);
      });
      // added to get correctly the displayName
      this.authService.signIn(this.userInfo.email, this.userInfo.password);
      // update Cloud Firestore
      this.afs.collection('Users/').ref.add({
        'email': this.userInfo.email,
        'firstName': this.userInfo.firstName,
        'lastName': this.userInfo.lastName });
      this.authService.logout();
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      this.errorMessage = error.message;
      console.log(this.errorMessage);
      // ...
    });

  }

  emailInvalid(){
    return this.errorMessage != '';
  }
}
