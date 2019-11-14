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

  constructor(
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }


  async register() {
    try {
      await this.registerWithEmailAndPassword();
      this.signIn();
      this.updateUserInfo();
      this.redirectToLoginPage();
    } catch (error) {
      // Handle Errors here.
      this.errorMessage = error.message;
      console.log(this.errorMessage);
    }
  }

  async registerWithEmailAndPassword() {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password);
      this.userInfo.uid = user.user.uid;
      await user.user.updateProfile({
        displayName: this.userInfo.firstname,
        photoURL: ''
      });
    } catch (err) {
      throw err;
    }
  }

  signIn() {
    try {
      // added to get correctly the displayName
      this.authService.signIn(this.userInfo.email, this.userInfo.password);
    } catch (err) {
      throw err;
    }
  }

  updateUserInfo() {
    this.afs.collection('Users/').doc(this.userInfo.uid).set({
      uid: this.userInfo.uid,
      email: this.userInfo.email,
      firstname: this.userInfo.firstname,
      lastname: this.userInfo.lastname,
      role: Role.Visitor
    });
    this.authService.logout();
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  emailInvalid() {
    return this.errorMessage !== '';
  }
}
