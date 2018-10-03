// En grande partie le code à été pris dans le site suivant:
// https://angularfirebase.com/snippets/angularfire2-version-4-authentication-service/#Gist

// Rôle : récupère et gère les informations d'authentification d'un utilisateur
// donné naviguant dans l’application, qu'il soit anonyme ou connecté via compte
// utilisateur ou autre plateforme.
// Le service d’authentification offert par AngularFirebase, disponible
// de la bibliothèque de services offerte par AngularFirebase, est utilisé.
//
// Secret​ ​:​ la correspondance entre l’identifant de l’utilisateur et du token
// validant son authentification.

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Role, User } from '../user.model';

@Injectable()
export class AuthService {
  user: Observable<User>;
  authState: any = null;
  currentUser: string = null;
  email: string;
  private UserCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  signIn(email, password): any {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        localStorage.setItem(
          'currentUser',
          JSON.stringify(credentials.displayName)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.email = result.user.email;
        this.afs
          .collection('Users')
          .ref.where('email', '==', this.email)
          .get()
          .then(snapshot => {
            if (snapshot.size === 0) {
              this.afs.collection('Users').ref.add({
                id: firebase.auth().currentUser.uid,
                email: this.email,
                firstname: '?',
                lastname: '?'
              });
            } else {
            }
          });

        // let userContent: Array<Object> = [this.username,this.email];
        localStorage.setItem(
          'currentUser',
          JSON.stringify(result.user.displayName)
        );
      })
      .catch(error => this.handleError(error));
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      password: '',
      role: Role.Visitor
      // lastname:"???"
    };
    return userRef.set(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {});
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

  isConnected(): boolean {
    return firebase.auth().currentUser != null;
  }
}
