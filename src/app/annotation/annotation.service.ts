import { Injectable } from '@angular/core';
// import { Entity } from '../shared/entity.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';
import { BratUtils } from './brat/brat-utils';
import * as firebase from 'firebase';


// import { Entity } from '../shared/security/auth.service.ts'


@Injectable()
export class AnnotationService {

  currentUserId: string;
  AnnotatedDocument1: AnnotatedDocument;

  constructor(private readonly afs: AngularFirestore) {
    this.currentUserId = firebase.auth().currentUser.uid;
  }


  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }



  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument, suffix: string = ''): void {

    // On initie le chmapps le userID s'il n'ete pas deja fait
    // this.currentUserId = firebase.auth().currentUser.uid;
    annotatedDocument.userId = this.currentUserId;

    /* If the document does not exist, it will be created. If the document does exist, its
      contents will be overwritten with the newly provided data */
    const Adoc = this.afs.collection('AnnotatedDocument');
    Adoc.doc(annotatedDocument.documentId + this.currentUserId + suffix).set(annotatedDocument);
  }


  getAnnotatedDocument(documentId: string): Promise<any> {
    this.currentUserId = firebase.auth().currentUser.uid;
    // On lui envoie la copie qui lui est associe.  Cette copie a ete cree lorsqu'il a clique sur view
    return this.afs.collection('AnnotatedDocument/').doc(documentId + this.currentUserId).ref.get();
  }



  // Fonctionne qui sera utilise pour cherhcer un annotatedDocument specifique a un corpus et un utilisateur specifique
  getSpecificAnnotatedDocument(documentId: string, specificUserId: string): Promise<any> {
    return this.afs.collection('AnnotatedDocument/').doc(documentId + specificUserId).ref.get();
  }



  // Fonction qui devrait retourner le nom de tous les Annotated Document corespondant a un Corpus specific
  async getAllAnnotatedDocumentsForCorpus(corpusId: string): Promise<any> {
    // Utilisation
    //console.log('Getting uids');
    //const test = await this.as.getAllUserID('VR51w02UKoPsOL133djf');
    //console.log(test.docs[0].data());

    // On demande a la BD de nous envoyer tous les userIDs associe a notre corpus
    const snap = await this.afs.collection('AnnotatedDocument/', ref => ref.where('documentId', '==', corpusId)).ref.get()
    return snap.docs.map(doc => doc.data());
  }
}
