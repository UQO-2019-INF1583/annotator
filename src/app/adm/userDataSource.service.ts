import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { User } from '../shared/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

export class UserDataSource extends DataSource<User> {
  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<User[]> {
    return this.afs
      .collection<User>('Users', ref => ref.orderBy('email'))
      .valueChanges();
  }

  disconnect(): void {}
}
