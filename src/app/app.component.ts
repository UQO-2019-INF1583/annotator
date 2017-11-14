import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})

export class AppComponent {
  title = 'Annotateur';
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal = '';

  constructor(public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
    this.user = this.afAuth.authState;
    this.items = afDb.list('items');
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
