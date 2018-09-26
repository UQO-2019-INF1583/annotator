//Service permettant l'accès aux catégories.
import { Injectable } from '@angular/core';
import { Category } from './Category';
import { CATEGORIES } from './CategoryList';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CategoryService {

  constructor() { }

  getCategory(): Observable<Category[]>{
    return of (CATEGORIES);
  }
}
