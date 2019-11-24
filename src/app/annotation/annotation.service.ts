import { Injectable } from '@angular/core';
import { Entity } from '../shared/entity.model'; //?
import { AngularFirestore } from '@angular/fire/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';
import { BratUtils } from './brat/brat-utils'; //?

@Injectable()
export class AnnotationService {
  /**
   * Crée un instance d'AnnotationService
   * 
   * @param afs
   * 
   */
  constructor(private readonly afs: AngularFirestore) {
  }

  /**
   * Retourne de façon asynschore le document de type project
   * 
   * @param projectId - Le id du projet
   * @returns Le document de type project, dont le it est passé en paramètre 
   */
  getProject(projectId: string): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }

  /**
   * //TODO
   * @param annotatedDocument 
   */
  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument): void {
    if (annotatedDocument.documentId === null) {
      annotatedDocument.documentId = this.afs.createId();
    }

    this.afs
      .collection('AnnotatedDocument')
      .doc(annotatedDocument.documentId)
      .set(Object.assign({}, annotatedDocument));
  }

  /**
   * //TODO
   * @param documentId 
   */
  getAnnotatedDocument(documentId: string): Promise<any> {
    return this.afs.collection('AnnotatedDocument/').doc(documentId).ref.get();
  }

}
