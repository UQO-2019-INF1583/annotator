import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Project } from '../../shared/project.model';

@Injectable()
export class CreateProjectService {

  constructor(private afs: AngularFirestore) { }

  createNewProject(project: Project) {
    project.id = this.afs.createId();
    const currentUserId = firebase.auth().currentUser.uid;
    project.admin.push(currentUserId);
    project.annotators.push(currentUserId);
    this.afs.collection('Projects').doc(project.id).set(project);
  }

  projectNameExists(project: Project): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<Project>('Projects')
        .ref
        .where('title', '==', project.title)
        .get()
        .then(projects => (
          resolve(projects.size >= 1)
        ));
    });
  }
}
