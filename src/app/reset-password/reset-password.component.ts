import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  //styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  userInfo: any = {};
  constructor(public auth: AuthService, ) { }
  successMessage: String;
  emailSent: boolean = false;

  ngOnInit() {
  }
  //Si l'utilistateur est enregistré
  resetPassword(email: string) {
    this.emailSent = true;
    this.auth.resetPassword(this.userInfo.email)
      //Envoyer un URL à l'utilisateur
      .then(() => {
        // this.successMessage = "A password reset email has been sent.";
        this.successMessage = "We sent you a message to this email.";
      })
      .catch(error => {
        //TODO: Traitement des erreurs
        this.emailSent = false;
        // Afficher le message d'erreur.
        this.successMessage = error.message;
      });
  }
}