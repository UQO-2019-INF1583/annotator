import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

//import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router) { }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
    this.loading = true;
    /*
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    */
  }
}
