// Service permettant l'accès aux catégories.
import {Injectable} from '@angular/core';
import {Category} from './Category';
import {CATEGORIES} from './CategoryList';
import {EntityType} from './EntityType';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Project} from '../shared/project.model';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {forEach} from '@angular/router/src/utils/collection';
import {isFunction} from "util";


@Injectable()
export class CategoryService {

  constructor(private readonly afs: AngularFirestore) {
  }

  // Retourne le contenu du fichier mock CategoryList.ts
  getCategory(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  getProject(projectId) {
    if (isFunction(this.afs.collection<Project>('Projects').doc)) {
      return this.afs.collection<Project>('Projects').doc(projectId)
    } else {
      // La fonction se fait exécuter à partir des tests, donc asf est un stub.
      return this.afs.collection('Projects');
    }
  }

  // Retourne de façon asynchrone les catégories d'un projet dont le id est passé en paramètre, à partir de la base de données Firestore
  getCategories(projectId) {
    return Observable.fromPromise(this.getProject(projectId).ref.get()
      .then((documentSnapshot) => documentSnapshot.data().categories));
  }

  // Transforme une catégorie en type d'entité
  getCategoriesAsEntityTypes(categories: Category[]): any {
    let newTypes = new Array <EntityType>() ;
    let newType: EntityType;
    categories.forEach(function (category) {
      newType = new EntityType();
      newType.name = category.name;
      newType.type = category.name;
      newType.labels = [category.name, category.name];
      newType.bgColor = category.color;
      newTypes.push(newType);
    });
    return newTypes;
  }
}
