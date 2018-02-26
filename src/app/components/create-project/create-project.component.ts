import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  project = { 'id': '', 'title': '', 'description': '' };
  currentUserId: string;

  constructor(public router: Router, private afs: AngularFirestore) { }

  ngOnInit() { }

  create(){

    if (this.project.title != null && this.project.title != '' && this.project.description != null &&
      this.project.description != '') {

      //this.project.admin = firebase.auth().currentUser.uid;
      this.project.id = this.afs.createId();
      this.currentUserId = firebase.auth().currentUser.uid;

      this.afs.collection('Projects').doc(this.project.id).set(this.project);

      this.afs.collection('Annotateurs').add({ 'id': this.currentUserId, 'projectId': this.project.id });

      alert('Création d\' un nouveau projet réussi');
      this.router.navigate(['/']);
    }
  }
}
