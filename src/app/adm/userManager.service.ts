import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/security/auth.service';

// secret de la classe: structure de données utilisée pour représenter l'ensemble des utilisateurs

@Injectable()
export class UserManagerService {
  user: Observable<User>;

  constructor(private authService: AuthService) {
    this.user = this.authService.user != null ? this.authService.user : null;
  }

  displayName(): string {
    //this.user != null ? this.user.email : null;
    return '';
  }

  // Ajoute un nouvel utilisateur dans la base de données.
  // Retourne false si son username existe déjà.
  addUser(user: firebase.User): boolean {
    return false;
  }

  // Affiche le profile de l'utilisateur
  setCurrentUser(user: firebase.User): boolean {

    //this.currentUser.email = user.email;
    return false;
  }

  // Affiche le profile de l'utilisateur
  displayUser(): boolean {
    firebase.initializeApp(environment.firebase, 'first');
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      return true;
    }
    else {
      return false;
    }
  }

  // Supprime un utilisateur.
  // Retourne false si username n'existe pas.
  delUser(username: string): boolean {
    return false;
  }

  // Modifie un utilisateur.
  // Retourne false si username n'existe pas.
  replaceUser(user: firebase.User): boolean {
    return false;
  }

  // Vérifie si username existe.
  checkUser(username: string): boolean {
    return false;
  }

}
