import { Injectable } from '@angular/core';
import { Entity } from '../shared/entity.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';
import { BratUtils } from './brat/brat-utils';

@Injectable()
export class AnnotationService {

  constructor(private readonly afs: AngularFirestore) {
  }

  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }

  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument): void {
    if (annotatedDocument.documentId === null) {
      annotatedDocument.documentId = this.afs.createId();
    }

    const data = {
      document: JSON.stringify(BratUtils.getDocDataFromAnnotatedDocument(annotatedDocument))
    }

    this.afs.collection('AnnotatedDocument').doc(annotatedDocument.documentId).set(data);
  }

  getAnnotatedDocument(documentId: string): Promise<any> {
    return this.afs.collection('AnnotatedDocument/').doc(documentId).ref.get();
  }

}
