import { Injectable } from '@angular/core';
// import { Entity } from '../shared/entity.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';
import { BratUtils } from './brat/brat-utils';
import * as firebase from 'firebase';
import { config } from 'rxjs';


// import { Entity } from '../shared/security/auth.service.ts'


@Injectable()
export class AnnotationService {

  currentUserId: string;


  constructor(private readonly afs: AngularFirestore) {
    this.currentUserId = firebase.auth().currentUser.uid;
  }


  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }



  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument): void {

    // On initie le chmapps le userID s'il n'ete pas deja fait
    const currentUserId = firebase.auth().currentUser.uid;
    annotatedDocument.userId = currentUserId;

    /* If the document does not exist, it will be created. If the document does exist, its
      contents will be overwritten with the newly provided data */
    const citiesRef = this.afs.collection('AnnotatedDocument');
    citiesRef.doc(annotatedDocument.documentId + currentUserId).set(annotatedDocument);

  }


  getAnnotatedDocument(documentId: string): Promise<any> {
    // On lui envoie la copie qui lui est associe.  Cette copie a ete cree lorsqu'il a clique sur view
    return this.afs.collection('AnnotatedDocument/').doc(documentId + this.currentUserId).ref.get();
  }






  // Fonction qui va retourner le nom de tous les Annotated Document corespondant a un Corpus specific
  getAllAnnotatedDocuments(corpusId: string): string[] {


    // Variable qui va nous permettre d'utiliser les codes ci-dessous afin d'acceder au BD et
    // itere a travers les documents (AnnotatedDocuments)
    const db = firebase.firestore();

    // Variable qui va contenir le nom de tous les AnnotatedDocuments qui se trouvent dans mon corpus
    var AllAnnotatedDocumentsIds = new Array();


    db.collection('AnnotatedDocument/').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {

        if (corpusId === doc.data().documentId) {
          AllAnnotatedDocumentsIds.push(doc.data().userId);
          console.log('userIds: ' + doc.data().userId);
        }
      })
    })

    var clothing = ['shoes', 'shirts', 'socks', 'sweaters'];
    console.log(clothing.length);

    console.log('La taille de mon tableau=  ' + AllAnnotatedDocumentsIds);
    return AllAnnotatedDocumentsIds;
  }

}


    // On a accee aux information general des element de la collections
/*
    db.collection('AnnotatedDocument/').get().then((snapshot) => {
      console.log(snapshot.docs);
    })
*/


/*
// Accee au document complet
console.log('Doc Data:  ');
console.log(doc.data());

// Accee au document id (nom du document dans la BD)
console.log('Doc.id: ');
console.log(doc.id);

// Accee a un champ precis document Id
console.log('documentId: ');
console.log(doc.data().documentId);

*/
