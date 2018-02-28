import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Injectable()
export class ProjectService {
  temp: any;

  constructor(private afs: AngularFirestore) {

  }

  getProject(id: string): any {

  }

}
