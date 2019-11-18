import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { } from 'jasmine';
import { MOCK_ENTITIES } from './annotation.service.MOCKDATA';

import { AnnotationService } from './annotation.service';
import { annotDoc } from './brat/brat-utils.mock';
// import { firebasemock } from "firebase-mock";
import { AuthService } from '../shared/security/auth.service';
import firebase from 'firebase';

// const annotationService;
// const afs;
describe('Annotation', () => {
  this.afs.s = {};
  // this.annotationService = new AnnotationService();
  let service;
  const AngularFirestoreStub = {
    collection: collectionName => {
      return {
        ref: {
          get: () => {
            return {
              then: () => {
                return MOCK_ENTITIES;
              }
            };
          }
        }
      };
    }
  };
  // let mockauth = new firebasemock.MockAuthentication();
  // let mockdatabase = new firebasemock.MockFirebase();
  // let afsmock = new firebasemock.MockFirestore();
  // service = new AnnotationService(afsmock, auth);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnotationService,
        { provide: AngularFirestore, useValue: AngularFirestoreStub }
      ]
    });
  });

  xit('should be created', inject(
    [AnnotationService],
    (service: AnnotationService) => {
      expect(service).toBeTruthy();
    }
  ));

  xit('should allow to get entities for a certain project ID', inject(
    [AnnotationService],
    (service: AnnotationService) => {
      // expect(ENTITIES == service.getEntities(1));
    }
  ));

  xit('should only allow authenticated users to call the annotation service', inject(
    [AnnotationService],
    (service: AnnotationService) => {
      // TODO Needs to be implemented in the code as well, not only in Firestore's rules.
    }
  ));

  xit('should only return entities for projects associated with the user\'s level of permission', inject(
    [AnnotationService],
    (service: AnnotationService) => {
      // TODO Needs a better understanding of the Database
    }
  ));

  xit('should save a new annotated document to the db', () => {
    // test pour sauvegarder un document annoté dans la base de données
    // expect()
  });
  xit('should save a merged annotated document to the db', () => {
    // mock annotated document(s)
    // appeler la fonction saveannotateddocument
    // vérifier si le nom du document contient le _MERGED
  });

  /*
  xit("should save a merged annotated document to the db", () => {
    //mock annotated document(s)
    //appeler la fonction saveannotateddocument
    //vérifier si le nom du document contient le _MERGED
    var collection;
    afsmock = {
      collection: function() {
        if (!collection) collection = firebase.firestore().collection("people");
        return collection;
      },
      greet: function(person) {
        console.log("hi " + person.first);
      },
      process: function() {
        afsmock
          .collection()
          .get()
          .then(function(snaps) {
            snaps.forEach(function(doc) {
              afsmock.greet(doc.data());
            });
          });
      }
    };
    let auth = new AuthService(afsmock, afsmock);
    service = new AnnotationService(afsmock, auth);
    service.getAllAnnotatedDocumentsForCorpus("123");
  });
*/


});
