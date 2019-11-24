import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';

import { AuthService } from '../shared/security/auth.service';
import { Role, User } from '../shared/user.model';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  userInfo: User = {
    uid: '', email: '', password: '', role: Role.Visitor,
    firstname: '', lastname: ''
  };
  errorMessage = '';

  constructor(private router: Router, public authService: AuthService, public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
      .then((user) => {
        this.userInfo.uid = user.user.uid;
        user.user.updateProfile({
          displayName: this.userInfo.firstname,
          photoURL: ''
        }).then(() => {
          // Update successful. Add the user to ..
        }).catch(function (error) {
          console.log(error);
        });
        // added to get correctly the displayName
        this.authService.signIn(this.userInfo.email, this.userInfo.password);
        // update Cloud Firestore
        this.afs.collection('Users/').doc(this.userInfo.uid).set({
          uid: this.userInfo.uid,
          email: this.userInfo.email,
          firstname: this.userInfo.firstname,
          lastname: this.userInfo.lastname,
          role: Role.Visitor
        });
        this.authService.logout();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        this.errorMessage = error.message;
        console.log(this.errorMessage);
        // ...
      });

  }

  emailInvalid() {
    return this.errorMessage !== '';
  }
}
