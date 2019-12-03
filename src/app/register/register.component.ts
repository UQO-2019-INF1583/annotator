import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../shared/security/auth.service';
import { Role, User } from '../shared/user.model';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

// Composant principale 
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

  // Déclaration de la fonction ascync 
  async register() {
    try {
      await this.registerWithEmailAndPassword();
      //  this.signIn();
      this.updateUserInfo();
      this.redirectToLoginPage();
    } catch (error) {
      // Handle Errors here.
      this.errorMessage = error.message;
      console.log(this.errorMessage);
    }
  }
  // Methode qui fait l'enregistrement des utilisateurs en créant   
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

  /*
  Cette methode signIn() connecte l'utilisateur après la création de son compte, cela se fait à partir de 
  la methode signIn qui se trouve dans le fichier service Auth.service.ts et c'est cette methode qui a causé
  le (bug#125 utilisateur est connecté apres la creation de son compte). Le profile utilisateur qui est affiché
  dans l'entête après la connection est prise en charge par le "HeaderComponent" qui se trouve dans share/components/
  header
*/
  /*
      signIn() {
        try {
         this.authService.signIn(this.userInfo.email, this.userInfo.password);
        } catch (err) {
          throw err;
        }
      }
  */
  //Cette methode fait la mise à jour de l'utilisateur puis ensuite, le logout() de authservice déconnécte l'utilisateur
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
  //Methode qui redirige l'utilisateur vers la fenêtre qui confirme que l'utilisateur 
  //a été sauvegarder avec succès après l'enregistrement de son compte. 
  redirectToLoginPage() {

    this.router.navigate(['/popup']);
  }
  // Cette methode retourne un message d'erreur quand l'email est invalid
  emailInvalid() {
    return this.errorMessage !== '';
  }
}
