import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";
import { User } from "../../models/user.model";
import { Project, ProjectUtils } from "../../models/project.model";

import { Entity } from "../../models/entity.model";

@Injectable()
export class ProjectService {
  projectCollection: AngularFirestoreCollection<Project>;
  projectDoc: AngularFirestoreDocument<Project>;
  projects: Observable<Project[]>;

  constructor(private afs: AngularFirestore) {
    this.projectCollection = this.afs.collection("Projects/");
    this.projects = this.afs.collection("Projects/").valueChanges();
  }

  getProjectDocument(id: string) {
    return this.afs.doc("Projects/" + id);
  }

  getProjectCollection() {
    return this.projectCollection;
  }

  getProjects() {
    return this.projects;
  }

  getProjectsOrderBy(orderBy: string, dir: boolean) {
    if (dir)
      return this.afs.collection("Projects/", ref => {
        return ref.orderBy(orderBy, "asc");
      });
    else
      return this.afs.collection("Projects/", ref => {
        return ref.orderBy(orderBy, "desc");
      });
  }

  getProject(projectId: string): Promise<any> {
    return this.afs
      .collection("Projects/")
      .doc(projectId)
      .ref.get();
  }

  // Trouve les textes du projet sélectionné
  getCorpus(projectId: string): Observable<any[]> {
    return this.afs
      .collection("Corpus", ref => ref.where("projectId", "==", projectId))
      .valueChanges();
  }

  // Save the project with all change
  saveProject(project: Project) {
    this.afs
      .collection("Projects")
      .doc(project.id)
      .set(project);
  }

  // Supprime un texte
  deleteCorpus(corpusId: string, corpusTitle: string) {
    this.afs
      .collection("Corpus")
      .doc(corpusId)
      .delete();
    firebase
      .storage()
      .ref()
      .child("Projects/" + corpusId + "/" + corpusTitle)
      .delete();
  }

  // Ajoute un nouveau texte
  addCorpus(corpus: any, projectId: string) {
    const corpusId = this.afs.createId();

    this.afs
      .collection("Corpus")
      .doc(corpusId)
      .set({ id: corpusId, projectId: projectId, title: corpus.corpusTitle });

    firebase
      .storage()
      .ref()
      .child("Projects/" + corpusId + "/" + corpus.corpusTitle)
      .put(corpus.corpusFile);
  }

  getUsers(): Observable<any> {
    return this.afs.collection<User>("Users").valueChanges();
  }
}
