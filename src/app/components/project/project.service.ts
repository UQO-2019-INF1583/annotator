import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Project } from '../../shared/project.model';
import { User } from './../../shared/user.model';

@Injectable()
export class ProjectService {

  constructor(private afs: AngularFirestore) {

  }

  getProject(projectId: string): Promise<any> {
    return this.afs.collection('Projects/').doc(projectId).ref.get();
  }

  // Trouve les textes du projet sélectionné
  getCorpus(projectId: string): Observable<any[]> {
    return this.afs.collection('Corpus', ref => ref.where('projectId', '==', projectId)).valueChanges();
  }

  // Save the project with all change
  saveProject(project: Project) {
    this.afs.collection('Projects').doc(project.id).set(project);
  }

  // Supprime un texte
  deleteCorpus(corpusId: string, corpusTitle: string) {
    this.afs.collection('Corpus').doc(corpusId).delete();
    firebase.storage().ref().child('Projects/' + corpusId + '/' + corpusTitle).delete();
  }

  // Ajoute un nouveau texte
  addCorpus(corpus: any, projectId: string) {
    const corpusId = this.afs.createId();

    this.afs.collection('Corpus').doc(corpusId)
      .set({ 'id': corpusId, 'projectId': projectId, 'title': corpus.corpusTitle });

    firebase.storage().ref().child('Projects/' + corpusId + '/' + corpus.corpusTitle).put(corpus.corpusFile);
  }

  getUsers(): Observable<any> {
    return this.afs.collection<User>('Users').valueChanges();
  }

}
