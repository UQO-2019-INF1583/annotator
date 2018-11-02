import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/project.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class AnnotationService {
  static currentDoc: Document = null;

  constructor(private readonly afs: AngularFirestore) {
  }

  getProject(projectId): AngularFirestoreDocument<any> {
    const projectRef = this.afs.collection<Project>('Projects').doc(projectId);
    return projectRef;
  }

  getEntities(projectId) {
    return Observable.fromPromise(this.getProject(projectId).ref.get().then((documentSnapshot) => documentSnapshot.data().entities));
  }

}
