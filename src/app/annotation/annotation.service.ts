import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AnnotatedDocument } from '../shared/annotated-document.model';
import { BratUtils } from './brat/brat-utils';
import * as firebase from 'firebase';
import { AuthService } from '../shared/security/auth.service';

@Injectable()
export class AnnotationService {
  currentUserId: string;
  AnnotatedDocument1: AnnotatedDocument;

  constructor(private readonly afs: AngularFirestore, auth: AuthService) {
    this.currentUserId = auth._userId;
    // this.currentUserId = firebase.auth().currentUser.uid;
  }

  // Retourne l'information sur l'utilisateur courrant/connecte
  getUserInfo(): Promise<any> {
    return this.afs
      .collection('Users/')
      .doc(this.currentUserId)
      .ref.get();
  }

  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): Promise<any> {
    return this.afs
      .collection('Projects/')
      .doc(projectId)
      .ref.get();
  }


  // Sauvgarde de l'annotatedDocument
  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument, suffix: string = ''): boolean  {
    // On initie le chmapps le userID s'il n'ete pas deja fait
    annotatedDocument.userId = this.currentUserId;

    // On enregistre le AnnotatedDocument dans la base de donnee
    const Adoc = this.afs.collection('AnnotatedDocument');
    // Adoc.doc(annotatedDocument.documentId + this.currentUserId + suffix).set(annotatedDocument);

    Adoc.doc(annotatedDocument.documentId + this.currentUserId + suffix).set(annotatedDocument).then(function () {
      return true;
    }).catch(function (error) {
      return false;
    });
    return true;
  }

  // Sauvgarde de l'annotatedDocument fussione
  saveMergedAnnotatedDocument(
    annotatedDocument: AnnotatedDocument
  ): Promise<any> {
    annotatedDocument.userId = this.currentUserId;
    annotatedDocument.documentId = annotatedDocument.documentId + '_MERGED';
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection('AnnotatedDocument')
        .doc(annotatedDocument.documentId)
        .set(annotatedDocument)
        .then(res => resolve(1), err => reject(err));
    });
  }

  // Retourne l'AnnotatedDocument coresspondant au documentID et appartenant a l'utilisateur connecte
  getMergedAnnotatedDocument(documentId: string): Promise<any> {
    // this.currentUserId = firebase.auth().currentUser.uid;
    return this.afs
      .collection('AnnotatedDocument/')
      .doc(documentId + '_MERGED')
      .ref.get();
  }

  // Retourne l'AnnotatedDocument coresspondant au documentID et appartenant a l'utilisateur connecte
  getAnnotatedDocument(documentId: string): Promise<any> {
    // this.currentUserId = firebase.auth().currentUser.uid;
    // On lui envoie la copie qui lui est associe.  Cette copie a ete cree lorsqu'il a clique sur view
    return this.afs
      .collection('AnnotatedDocument/')
      .doc(documentId + this.currentUserId)
      .ref.get();
  }


  // Fonction qui retourne le nom de tous les Annotated Document corespondant a un Corpus specific
  async getAllAnnotatedDocumentsForCorpus(corpusId: string): Promise<any> {
    // On demande a la BD de nous envoyer tous les userIDs associe a notre corpus
    const snap = await this.afs
      .collection('AnnotatedDocument/')
      .ref.where('documentId', '==', corpusId)
      .get();
    return snap.docs.map(doc => doc.data());
  }


}
