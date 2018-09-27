import { TestBed, inject } from '@angular/core/testing';
import {of} from 'rxjs/observable/of';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import { CategoryService } from './category.service';
import { MOCK_CATEGORIES } from './category.service.MOCKDATA';

describe('CategoryService', () => {

  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    collection: (someString) => {
      // return mocked collection here
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService, {provide: AngularFirestore, useValue: AngularFirestoreStub}]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should properly concert a category to an brat entity', inject([CategoryService], (service: CategoryService) => {
    const fauxService = jasmine.createSpyObj('CategoryService', ['getCategories']);
    // Make the spy return a synchronous Observable with the test data
    const getCategoriesSpy = fauxService.getCategories.and.returnValue( of(MOCK_CATEGORIES) );
    // TODO Convert categories into entities.
    // TODO Check old values are kept after conversion.
    // TODO Check if they're shown properly when loading categories.
    // TODO Check special characters conversion.
    // TODO Check if entity functions still work with that entity.
    // TODO Check if entity functions still work with that entity.
  }));
});
