import { Injectable } from '@angular/core';
import { Entite } from '../shared/entite.model';
import { EntityType } from './EntityType';
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/project.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class AnnotationService {

  constructor(private readonly afs: AngularFirestore) {
  }

  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): AngularFirestoreDocument<any> {
    const projectRef = this.afs.collection<Project>('Projects').doc(projectId);
    return projectRef;
  }

  // Retourne de façon asynchrone les entité d'un projet dont le id est passé en paramètre, à partir de la base de données Firestore
  getEntities(projectId) {
    return Observable.fromPromise(this.getProject(projectId).ref.get().then((documentSnapshot) => documentSnapshot.data().entities));
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
