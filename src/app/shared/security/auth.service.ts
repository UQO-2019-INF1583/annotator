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
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
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
} from '@angular/fire/firestore';

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
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signIn(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credentials => {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(credentials.user.displayName)
          );
          resolve();
        })
        .catch(function(error: Error) {
          reject(error);
        });
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
  }

  getUser() {
    return this.afAuth.auth.currentUser;
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

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
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
              }
            });

          // let userContent: Array<Object> = [this.username,this.email];
          localStorage.setItem(
            'currentUser',
            JSON.stringify(result.user.displayName)
          );
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
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
    localStorage.removeItem('currentUser');
  }

  isConnected(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser != null;
  }
}
