import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  //styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  userInfo: any = {};
  constructor(public auth: AuthService,) { }
  successMessage: String;
  emailSent: boolean = false;

  ngOnInit() {

  }

  resetPassword(email: string) {
  this.emailSent = true;
    this.auth.resetPassword(this.userInfo.email)
    .then(() => {
      this.successMessage = "A password reset email has been sent.";
  })
  .catch(error => {
      //TODO: Error handling
    this.emailSent = false;
    });
  }
}