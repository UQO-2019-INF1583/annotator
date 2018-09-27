import { TestBed, inject } from '@angular/core/testing';
import {of} from 'rxjs/observable/of';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {} from 'jasmine';
import { CategoryService } from './category.service';
import { MOCK_CATEGORIES, CATEGORIES } from './category.service.MOCKDATA';
describe('CategoryService', () => {

  const AngularFirestoreStub = {
    collection: (someString) => {
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

  it('should properly convert a category to an brat entity', inject([CategoryService], (service: CategoryService) => {
    //let categoryService =  TestBed.get(CategoryService);
    //const fauxService = jasmine.createSpyObj('CategoryService', ['getCategories',]);
    // Make the spy return a synchronous Observable with the test data
    //const getCategoriesSpy = fauxService.getCategories.and.returnValue( of(MOCK_CATEGORIES) );
    const convertedAsEntities = service.getCategoriesAsEntityTypes(MOCK_CATEGORIES);
    for(var i = 0; i < convertedAsEntities.length; i++) {
    expect(convertedAsEntities[i].type === MOCK_CATEGORIES[i].name);
    expect(convertedAsEntities[i].bgColor === MOCK_CATEGORIES[i].color);
    }
  }));


  it('getCategories should return CATEGORIES', inject([CategoryService], (service: CategoryService) => {
    //expect(CATEGORIES === service.getCategory());
   service.getCategory().subscribe(categories => {
     expect(CATEGORIES === categories);
   });

  }));

});
    // TODO Convert categories into entities.
    // TODO Check old values are kept after conversion.
    // TODO Check if they're shown properly when loading categories.
    // TODO Check special characters conversion.
    // TODO Check if entity functions still work with that entity.
    // TODO Check if entity functions still work with that entity.
