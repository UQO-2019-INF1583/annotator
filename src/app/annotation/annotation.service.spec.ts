import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { } from 'jasmine';
import { MOCK_ENTITIES } from './annotation.service.MOCKDATA';
import { EntityType } from './EntityType';
import { AnnotationService } from './annotation.service';

describe('Annotation', () => {

  const AngularFirestoreStub = {
    collection: (collectionName) => {
      return {
        ref: {
          get: () => {
            return {
              then: () => {
                return MOCK_ENTITIES
              }
            }
          }
        }
      };
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationService, { provide: AngularFirestore, useValue: AngularFirestoreStub }]
    });
  });

  it('should be created', inject([AnnotationService], (service: AnnotationService) => {
    expect(service).toBeTruthy();
  }));

  it('should properly convert a category to a brat entity', inject([AnnotationService], (service: AnnotationService) => {
    const convertedAsEntities = service.getCategoriesAsEntityTypes(MOCK_ENTITIES);
    for (let i = 0; i < convertedAsEntities.length; i++) {
      expect(convertedAsEntities[i].type === MOCK_ENTITIES[i].name);
      expect(convertedAsEntities[i].bgColor === MOCK_ENTITIES[i].bgColor);
    }
  }));

  it('should transform entity type categories', inject(
    [AnnotationService],
    (annotationService: AnnotationService) => {
      const transform = annotationService.getCategoriesAsEntityTypes(
        MOCK_ENTITIES
      );
      for (let i = 0; i < transform.length; i++) {
        expect(transform[i]).toEqual(jasmine.any(EntityType));
      }
    }
  ));

  it('should allow to get entities for a certain project ID', inject([AnnotationService], (service: AnnotationService) => {
    // expect(ENTITIES == service.getEntities(1));
  }));

  xit('should only allow authenticated users to call the annotation service',
    inject([AnnotationService], (service: AnnotationService) => {
      // TODO Needs to be implemented in the code as well, not only in Firestore's rules.
    }));

  xit('should only return entities for projects associated with the user\'s level of permission',
    inject([AnnotationService], (service: AnnotationService) => {
      // TODO Needs a better understanding of the Database
    }));
});
