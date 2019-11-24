import { DataSource } from '@angular/cdk/collections';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

export class UsersDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    return this.afs.collection('Users').valueChanges();
  }

  disconnect(): void {

  }

}
