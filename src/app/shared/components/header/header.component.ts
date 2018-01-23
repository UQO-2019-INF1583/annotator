import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  public currUsername = '';
  currentUser: string = null;

  constructor(private authService: AuthService) {
    HeaderComponent.updateUserStatus.subscribe(res => {
      var cU = localStorage.getItem('currentUser');
      this.currUsername = cU == null ? '' : JSON.parse(cU);
    })
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authService.logout();
  }

  isUser(){
    return this.currUsername != '';
  }

}
