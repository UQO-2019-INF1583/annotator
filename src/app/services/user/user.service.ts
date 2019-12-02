import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user.model";
import { AuthService } from "../../tools/security/auth.service";
import { reject } from "q";

// secret de la classe: structure de données utilisée pour représenter l'ensemble des utilisateurs

@Injectable()
export class UserService {
  user: Observable<User>;
  currentUser: any;

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.user = this.authService.user != null ? this.authService.user : null;

    this.userCollection = this.afs.collection("Users/");
    this.users = this.afs.collection("Users/").valueChanges() as Observable<
      User[]
    >;
  }

  getUsers() {
    return this.users;
  }

  displayName(): string {
    //this.user != null ? this.user.email : null;
    return "";
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
    firebase.initializeApp(environment.firebase, "first");
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      return true;
    } else {
      return false;
    }
  }

  // Supprime un utilisateur.
  deleteUser(userId: string) {
    // todo: supprimer l'utilisateur comme admin ou annotateur
    this.afs
      .collection("Users")
      .doc(userId)
      .delete();
  }

  // Modifie un utilisateur.
  // Retourne false si username n'existe pas.
  modifyUser(user): boolean {
    console.log(user);
    this.afs
      .collection("Users")
      .doc(user.uid)
      .update({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      })
      .then(
        () => {
          console.log(user);
        },
        () => true
      );
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
      .collection("User", ref => ref.orderBy("displayName"))
      .valueChanges();
  }
}
