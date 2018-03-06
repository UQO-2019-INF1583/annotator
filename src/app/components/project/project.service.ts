import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Project } from '../../shared/project.class';


@Injectable()
export class ProjectService {
  temp: any;

  constructor(private afs: AngularFirestore) {

  }

  // Trouve les textes du projet sélectionné
  getCorpus(projectId: string): Observable<any[]> {
    return this.afs.collection('Corpus', ref => ref.where('projectId', '==', projectId)).valueChanges();
  }

  // Trouve les catégories du projet sélectionné
  getCategories(projectId: string): Observable<any[]> {

    return this.afs.collection('Categories', ref => ref.where('projectId', '==', projectId)).valueChanges();

  }

  // Trouve tous les annotateurs du projet
  getAnnotateur(projectId: string): Observable<any[]> {

    const annotateursCollection = this.afs.collection('Annotateurs', ref => ref.where('projectId', '==', projectId));

    const users = annotateursCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();

        const userId = data.userId;

        return this.afs.collection('Users').doc(userId).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(signup => {
          return { id: signup.id, firstName: signup.firstName, lastName: signup.lastName }
        });

      });
    }).flatMap(user => Observable.combineLatest(user));

    return users;
  }

  saveProject(project: Project) {
    this.afs.collection('Projects').doc(project.id)
      .update({ 'description': project.description, 'title': project.title });
  }

  // Supprime un texte
  deleteCorpus(corpusId: string) {
    console.log(corpusId);
    // pas implémenté pour le moment
  }

  // Supprime une catégorie
  deleteCategories(categorieId: string) {
    this.afs.collection('Categories').doc(categorieId).delete();
  }

  // Supprime un annotateur
  deleteAnnotateur(userId: string, projectId: string) {
    this.afs.collection('Annotateurs').ref.where('userId', '==', userId)
      .where('projectId', '==', projectId).get().then(querySnapshot => {
        const batch = this.afs.firestore.batch();

        querySnapshot.forEach(doc => {

          batch.delete(doc.ref);
        });

        return batch.commit();
      }).then(() => console.log('Annotateur supprimmer'));
  }

  // Ajoute un nouveau texte
  addCorpus(corpus: any, projectId: string) {
    const corpusId = this.afs.createId();

    this.afs.collection('Corpus').doc(corpusId)
      .set({ 'id': corpusId, 'projectId': projectId, 'title': corpus.corpusTitle });

    firebase.storage().ref().child('Projets/' + corpusId + '/' + corpus.corpusTitle).put(corpus.corpusFile);
  }

  // Ajoute un nouvel annotateur
  addAnnotateur(annotateur: any, projectId: string) {
    let annotateurExist = false;

    this.afs.collection('Annotateurs').ref.where('projectId', '==', projectId).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

        if (doc.data().userId === annotateur.id) {
          annotateurExist = true;
          console.log('Utilisateur est déjà un annotateur pour ce projet');
        }

      });

      if (annotateurExist === false) {
        const annotateurId = this.afs.createId();

        this.afs.collection('Annotateurs').doc(annotateurId)
          .set({ 'id': annotateurId, 'userId': annotateur.id, 'projectId': projectId });
        console.log('Annotateur ajouté');
      }

    });
  }

  // Ajoute une nouvelle catégories
  addCategorie(categorie: any, projectId: string) {
    // flag si la nouvel catégorie existe déjà
    let categoryExist = false;

    this.afs.collection('Categories').ref.where('projectId', '==', projectId).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

        // Vérifie si la nouvelle catégorie n'utilise pas un nom ou une couleur déjà utilisé
        if (doc.data().color === categorie.categoryColor) {
          categoryExist = true;
          console.log('La couleur choisit est déjà utilisé par une autre catégorie');

        } else if ((doc.data().name as string).toUpperCase() === (categorie.categoryName as string).toUpperCase()) {
          categoryExist = true;
          console.log('Le nom choisit est déjà utilisé par une autre catégorie');
        }

      });

      if (categoryExist === false) {

        const categorieId = this.afs.createId();
        // ajoute la nouvelle catégorie
        this.afs.collection('Categories').doc(categorieId)
          .set({
            'id': categorieId, 'projectId': projectId,
            'color': categorie.categoryColor, 'name': categorie.categoryName
          });
        console.log('Catégorie Ajouté');
      }
    });
  }

}
