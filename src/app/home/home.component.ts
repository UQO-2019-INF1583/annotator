import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  ngOnInit() {
    // reset login status
    // this.authService.logout();
  }

}
