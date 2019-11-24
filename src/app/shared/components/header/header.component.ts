import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../security/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Role } from '../../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  public static currUsername = '';
  static currRole: Role = Role.Visitor;
  authState: any = null;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    // this should be done in auth.service; done here to avoid problems with getting displayName
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      HeaderComponent.currUsername = this.authState != null ? this.authState.displayName : '';
      if (this.authState != null) {
        const userId: string = this.authState.uid;
        this.afs.collection('Users').ref.where('uid', '==', userId).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            HeaderComponent.currRole = doc.get('role');
          });
        });
      }
    });
  }

  ngOnInit() {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  get staticCurrUsername(): string {
    return HeaderComponent.currUsername;
  }

  logout() {
    // localStorage.removeItem('currentUser');
    HeaderComponent.currUsername = '';
    this.authService.logout();
  }

  isUser() {
    return HeaderComponent.currUsername !== '';
  }

  isAdmin() {
    return this.authService.isConnected() && HeaderComponent.currRole === Role.Adm;
  }

  // Verifie si on se trouve sur la page d'annotation
  isAnnotation(){
    var adress = window.location.pathname;
    return adress.includes("annotation");
  }

}
