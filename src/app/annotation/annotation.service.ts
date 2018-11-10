import { Injectable } from '@angular/core';
import { Entite } from '../shared/entite.model';
import { EntityType } from './EntityType';
import { AngularFirestore } from 'angularfire2/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';

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

    this.afs.collection('AnnotatedDocument').doc(annotatedDocument.documentId).set(annotatedDocument);
  }

  getAnnotatedDocument(documentId: string): Promise<any> {
    return this.afs.collection('AnnotatedDocument/').doc(documentId).ref.get();
  }

  // Transforme une catégorie en type d'entité
  // Note par J.F: Classe Category est maintenant identique à Entité. Par contre, on doit garder
  // la fonction de conversion sinon il faut changer tout les noms et débugger.
  getCategoriesAsEntityTypes(categories: Entite[]): EntityType[] {
    const newTypes = new Array<EntityType>();
    let newType: EntityType;
    categories.forEach(function (category) {
      newType = new EntityType();
      newType.name = category.name;
      newType.type = category.type;
      newType.labels = category.labels;
      newType.bgColor = category.bgColor;
      newTypes.push(newType);
    });
    return newTypes;
  }

}
