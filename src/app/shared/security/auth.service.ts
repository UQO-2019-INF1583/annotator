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
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../user.model';
/*interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}*/

@Injectable()
export class AuthService {
  username: string ="";
  user: Observable<User>;
  currentUser: string = null;
  email: string;
  private UserCollection : AngularFirestoreCollection<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
  }

  signIn(email, password): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(credentials => {
      console.log(credentials);
      //this.updateUserData(credentials);
      return this.user;
    });
  }
  login(user : User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(value => {
        localStorage.setItem('currentUser', JSON.stringify(value.displayName));
        this.authenticated();
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout(): void  {
    this.afAuth.auth.signOut();
    // clear token remove user from local storage to log user out
    //this.token = null;
    localStorage.removeItem('currentUser');
    //this.isLoggedIn = false;
    this.router.navigate(['/login']);
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

  //Verifie si un utilisateur est connecté
  authenticated() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        //this.router.navigateByUrl('');
        return false;
      }
      else {
        return true;
      }
    });
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.username = result.user.displayName;
        this.email = result.user.email;
        let userContent: Array<Object> = [this.username,this.email];

        localStorage.setItem('currentUser', JSON.stringify(result.user.displayName));
        this.authenticated();
      })
      .catch((error) =>  this.handleError(error) );
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      password: ""
    }
    return userRef.set(data)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
 private handleError(error: Error) {
   console.error(error);
 }

}
