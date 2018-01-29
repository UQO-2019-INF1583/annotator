import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  public static currUsername: string = '';
  //currentUser: string = null;
  authState: any = null;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
    // this should be done in auth.service; done here to avoid problems with getting displayName
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      HeaderComponent.currUsername = this.authState != null ? this.authState.displayName : '';
    });
  }

  ngOnInit() {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  get staticCurrUsername(): string {
    return HeaderComponent.currUsername;
  }

  logout() {
    //localStorage.removeItem('currentUser');
    HeaderComponent.currUsername = '';
    this.authService.logout();
  }

  isUser(){
    return HeaderComponent.currUsername != '';
  }

}
