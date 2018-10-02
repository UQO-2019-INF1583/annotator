import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Project } from '../../shared/project.model';

@Injectable()
export class ProjectService {
  constructor(private afs: AngularFirestore) {}

  getProject(id: string): any {
    this.afs
      .collection('Projects/')
      .doc(id)
      .ref.get()
      .then(doc => {
        return doc.data();
      });
  }

  // Trouve les textes du projet sélectionné
  getCorpus(projectId: string): Observable<any[]> {
    return this.afs
      .collection('Corpus', ref => ref.where('projectId', '==', projectId))
      .valueChanges();
  }

  // Trouve les catégories du projet sélectionné
  getCategories(projectId: string): string[] {
    return null;
  }

  saveProject(project: Project) {
    this.afs
      .collection('Projects')
      .doc(project.id)
      .update({ description: project.description, title: project.title });
  }

  // Supprime un texte
  deleteCorpus(corpusId: string, corpusTitle: string) {
    this.afs
      .collection('Corpus')
      .doc(corpusId)
      .delete();
    firebase
      .storage()
      .ref()
      .child('Projects/' + corpusId + '/' + corpusTitle)
      .delete();
  }

  // Ajoute un nouveau texte
  addCorpus(corpus: any, projectId: string) {
    const corpusId = this.afs.createId();

    this.afs
      .collection('Corpus')
      .doc(corpusId)
      .set({ id: corpusId, projectId: projectId, title: corpus.corpusTitle });

    firebase
      .storage()
      .ref()
      .child('Projects/' + corpusId + '/' + corpus.corpusTitle)
      .put(corpus.corpusFile);
  }
}
