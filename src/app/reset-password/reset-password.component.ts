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
  errorMessage='';

  ngOnInit() {

  }
  resetPassword(email: string) {
   this.auth.resetPassword(this.userInfo.email).then().catch((error)=>{console.log(error);this.errorMessage=error.message})
  }
  emailInvalid(){
	return this.errorMessage !== '';
  }
}
/*import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  userInfo: any = {};
  constructor(public auth: AuthService,) { }

  ngOnInit() {

  }
  resetPassword(email: string) {
   this.auth.resetPassword(this.userInfo.email);
  }
}*/
