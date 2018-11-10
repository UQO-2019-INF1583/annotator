import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
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
}
