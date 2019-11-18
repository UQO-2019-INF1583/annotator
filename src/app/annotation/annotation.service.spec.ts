import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { } from 'jasmine';
import { MOCK_ENTITIES } from './annotation.service.MOCKDATA';

import { AnnotationService } from './annotation.service';
import { annotDoc } from './brat/brat-utils.mock';

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

  xit('should allow to get entities for a certain project ID', inject([AnnotationService], (service: AnnotationService) => {
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

  it('should save a new annotated document to the db', () => {
    //test pour sauvegarder un document annoté dans la base de données
    // expect()
  })
  it('should save a merged annotated document to the db', () => {
    //mock annotated document(s)
    //appeler la fonction saveannotateddocument
    //vérifier si le nom du document contient le _MERGED
  })
});
