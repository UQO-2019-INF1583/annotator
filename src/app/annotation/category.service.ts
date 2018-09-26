// Service permettant l'accès aux catégories.
import {Injectable} from '@angular/core';
import {Category} from './Category';
import {CATEGORIES} from './CategoryList';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Project} from '../shared/project.model';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class CategoryService {

  constructor(private readonly afs: AngularFirestore) {
  }

  // Retourne le contenu du fichier mock CategoryList.ts
  getCategory(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): AngularFirestoreDocument <any> {
    const projectRef = this.afs.collection<Project>('Projects').doc(projectId);
    return projectRef;
  }

  // Retourne de façon asynchrone les catégories d'un projet dont le id est passé en paramètre, à partir de la base de données Firestore
  getCategories(projectId) {
    return Observable.fromPromise(this.getProject(projectId).ref.get().then((documentSnapshot) => documentSnapshot.data().categories));
  }

};
