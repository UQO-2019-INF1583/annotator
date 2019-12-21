import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/user.model';
import { AuthService } from '../../shared/security/auth.service';

// secret de la classe: structure de données utilisée pour représenter l'ensemble des utilisateurs

@Injectable()
export class UserManagerService {
  user: Observable<User>;
  currentUser: any;

  constructor(private authService: AuthService,
    private afs: AngularFirestore) {
    this.user = this.authService.user != null ? this.authService.user : null;
  }

  displayName(): string {
    // this.user != null ? this.user.email : null;
    return '';
  }

  // Ajoute un nouvel utilisateur dans la base de données.
  // Retourne false si son username existe déjà.
  addUser(user: firebase.User): boolean {
    return false;
  }

  // Affiche le profile de l'utilisateur
  setCurrentUser(user: firebase.User): boolean {

    // this.currentUser.email = user.email;
    return false;
  }

  // Affiche le profile de l'utilisateur
  displayUser(): boolean {
    firebase.initializeApp(environment.firebase, 'first');
    const user = firebase.auth().currentUser;
    return user != null;
  }

  // Supprime un utilisateur.
  deleteUser(userId: string) {
    // todo: supprimer l'utilisateur comme admin ou annotateur
    this.afs.collection('Users').doc(userId).delete();
  }

  // Modifie un utilisateur.
  // Retourne false si username n'existe pas.
  modifyUser(user): boolean {
    console.log(user);
    this.afs.collection('Users').doc(user.uid)
      .update({
        'email': user.email,
        'firstname': user.firstname,
        'lastname': user.lastname,
        'role': user.role
      }).then(() => {
      }, (() => true));
    return false;
  }

  // Vérifie si username existe.
  checkUser(username: string): boolean {
    return false;
  }

  his() {
    return JSON.parse(this.currentUser);
  }

  getAll() {
    return this.afs
      .collection('User', ref => ref
        .orderBy('displayName'))
      .valueChanges();
  }

}
