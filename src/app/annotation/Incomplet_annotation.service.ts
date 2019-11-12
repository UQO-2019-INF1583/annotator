import { Injectable } from "@angular/core";
// import { Entity } from '../shared/entity.model';
import { AngularFirestore } from "@angular/fire/firestore";
import { AnnotatedDocument } from "../shared/annotated-document.model";
import { BratUtils } from "./brat/brat-utils";
import * as firebase from "firebase";
// import { observeOn } from "rxjs/operators";
// import { Entity } from '../shared/security/auth.service.ts'

@Injectable()
export class AnnotationService {
  currentUserId: string;
  AnnotatedDocument1: AnnotatedDocument;
  usersIds;

  constructor(private readonly afs: AngularFirestore) {
    this.currentUserId = firebase.auth().currentUser.uid;
  }

  // Retourne de façon asynschore le document de type project, dont le id est passé en paramètre, à partir de la base de données Firestore
  getProject(projectId): Promise<any> {
    return this.afs
      .collection("Projects/")
      .doc(projectId)
      .ref.get();
  }

  saveAnnotatedDocument(annotatedDocument: AnnotatedDocument): void {
    // On initie le chmapps le userID s'il n'ete pas deja fait
    // this.currentUserId = firebase.auth().currentUser.uid;
    annotatedDocument.userId = this.currentUserId;

    /* If the document does not exist, it will be created. If the document does exist, its
      contents will be overwritten with the newly provided data */
    const Adoc = this.afs.collection("AnnotatedDocument");
    Adoc.doc(annotatedDocument.documentId + this.currentUserId).set(
      annotatedDocument
    );
  }

  getAnnotatedDocument(documentId: string) {
    this.currentUserId = firebase.auth().currentUser.uid;
    // On lui envoie la copie qui lui est associe.  Cette copie a ete cree lorsqu'il a clique sur view
    return this.afs
      .collection("AnnotatedDocument")
      .doc(`${documentId}${this.currentUserId}`)
      .ref.get();
    // .collection("AnnotatedDocument")
    // .doc(`${documentId}${this.currentUserId}`)
    // .valueChanges();

    // this.afs
    // .collection("AnnotatedDocument", ref =>
    //   ref
    //     .where("userId", "==", specificUserId)
    //     .where("documentId", "==", documentId)
    // )
    // .valueChanges();
  }

  // Fonctionne qui sera utilise pour cherhcer un annotatedDocument specifique a un corpus et un utilisateur specifique
  getSpecificAnnotatedDocument(
    documentId: string,
    specificUserId: string
  ): Promise<any> {
    return this.afs
      .collection("AnnotatedDocument/")
      .doc(documentId + specificUserId)
      .ref.get();
  }

  // Fonction qui devrait retourner le nom de tous les Annotated Document corespondant a un Corpus specific
  getAllUserID(corpusId: string) {
    // const userIDs = Array;
    return this.afs
      .collection("AnnotatedDocument", ref =>
        ref.where("documentId", "==", corpusId)
      )
      .valueChanges();
    // console.log(await data);
    // On demande a la BD de nous envoyer tous les userIDs associe a notre corpus

    // On renvoie le tableau userIDs;
  }
}