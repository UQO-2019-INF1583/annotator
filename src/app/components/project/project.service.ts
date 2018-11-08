import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../shared/project.model';

// TODO: Modify signature and remove all "any"
interface IProjectService {
  getProject: () => any,
  saveProject: () => any,
  getCorpus: () => any,
  addCorpu: () => any,
  deleteCorpu: () => any,
  getEntities: () => any,
  addEntity: () => any,
  deleteEntity: () => any,
  getAnnotators: () => any,
  addAnnotator: () => any,
  deleteAnnotator: () => any,
  getAdministrators: () => any,
  addAdministrator: () => any,
  deleteAdministrator: () => any,
  getAttributs: () => any,
  addAttribut: () => any,
  deleteAttribut: () => any,
  getEvents: () => any,
  addEvent: () => any,
  deleteEvent: () => any,
  getRelations: () => any,
  addRelation: () => any,
  deleteRelation: () => any,
}

@Injectable()
export class ProjectService implements IProjectService {
  private _afs: AngularFirestore;
  private _projectId: string;

  constructor(private afs: AngularFirestore, projectId: string) {
    this._afs = afs;
    // TODO: How do we pass the project id here?
    this._projectId = projectId;
  }

  getProject() {
    this.get('Projects');
  }

  saveProject() {
    this.update('Projects');
  }

  getCorpus() {
    return this.get('Corpus');
  }

  addCorpu() {
    return this.add('Corpus');
  }

  deleteCorpu() {
    return this.delete('Corpus');
  }

  getEntities() {
    return this.get('Entities');
  }

  addEntity() {
    return this.add('Entities');
  }

  deleteEntity() {
    return this.delete('Entities');
  }

  getAnnotators() {
    return this.get('Annotators');
  }

  addAnnotator() {
    return this.add('Annotators');
  }

  deleteAnnotator() {
    return this.delete('Annotators');
  }

  getAdministrators() {
    return this.get('Administrators');
  }

  addAdministrator() {
    return this.add('Administrators');
  }

  deleteAdministrator() {
    return this.delete('Administrators');
  }

  getAttributs() {
    return this.get('Attributs');
  }

  addAttribut() {
    return this.add('Attributs');
  }

  deleteAttribut() {
    return this.delete('Attributs');
  }

  getEvents() {
    return this.get('Events');
  }

  addEvent() {
    return this.add('Events');
  }

  deleteEvent() {
    return this.delete('Events');
  }

  getRelations() {
    return this.get('Relations');
  }

  addRelation() {
    return this.add('Relations');
  }

  deleteRelation() {
    return this.delete('Relations');
  }

  get(path: string): Observable<any[]> {
    return this._afs.collection(path, ref => ref.where('projectId', '==', this._projectId)).valueChanges();
  }

  add(path: string) {
    // TODO: Implement generic method
    /*
    Example for corpus

    const corpusId = this.afs.createId();

    this.afs.collection('Corpus').doc(corpusId)
      .set({ 'id': corpusId, 'projectId': projectId, 'title': corpus.corpusTitle });

    firebase.storage().ref().child('Projects/' + corpusId + '/' + corpus.corpusTitle).put(corpus.corpusFile);
    */
  }

  delete(path: string) {
    // TODO: Implement generic method
    /*
    Example for corpus

    this.afs.collection('Corpus').doc(corpusId).delete();
    firebase.storage().ref().child('Projects/' + corpusId + '/' + corpusTitle).delete();
    */
  }

  update(path: string) {
    // TODO: Implement generic method
    /*
    Example for project:

    this.afs.collection('Projects').doc(project.id)
      .update({ 'description': project.description, 'title': project.title });
    */
  }
}
