import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Project } from '../shared/project.model';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable()
export class ProjectDataSource extends DataSource<Project> {

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<Project[]> {
    return this.afs.collection<Project>('Projects', ref => ref.orderBy('title')).valueChanges();
  }

  disconnect() { }
}
