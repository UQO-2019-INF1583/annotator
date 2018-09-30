import {TestBed, inject} from '@angular/core/testing';
import {AngularFirestore} from 'angularfire2/firestore';
import {} from 'jasmine';
import {CategoryService} from './category.service';
import {MOCK_CATEGORIES, CATEGORIES} from './category.service.MOCKDATA';

describe('CategoryService', () => {

  /*const AngularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(MOCK_CATEGORIES)
  };*/
  const AngularFirestoreStub = {
    collection: (collectionName) => {
      return {
        ref: {
          get: () => {
            return {
              then: () => {
                return MOCK_CATEGORIES
              }
            }
          }
        }
      };
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

  it('should properly convert a category to a brat entity', inject([CategoryService], (service: CategoryService) => {
    const convertedAsEntities = service.getCategoriesAsEntityTypes(MOCK_CATEGORIES);
    for (let i = 0; i < convertedAsEntities.length; i++) {
      expect(convertedAsEntities[i].type === MOCK_CATEGORIES[i].name);
      expect(convertedAsEntities[i].bgColor === MOCK_CATEGORIES[i].color);
    }
  }));

  it('getCategory should return CATEGORIES', inject([CategoryService], (service: CategoryService) => {
    service.getCategory().subscribe(categories => {
      expect(CATEGORIES === categories);
    });
  }));

  it('should allow to get categories for a certain project ID', inject([CategoryService], (service: CategoryService) => {
      expect(CATEGORIES === service.getCategories(1));
  }));

  xit('should only allow authenticated users to call the categories service',
    inject([CategoryService], (service: CategoryService) => {
      // TODO Needs to be implemented in the code as well, not only in Firestore's rules.
    }));

  xit('should only return categories for projects associated with the user\'s level of permission',
    inject([CategoryService], (service: CategoryService) => {
      // TODO Needs a better understanding of the Database
    }));

  xit('categories converted into entities should have entities capabilities',
    inject([CategoryService], (service: CategoryService) => {
      // TODO Check if entity functions still work with that entity, once entities functions are implemented
    }));
});
