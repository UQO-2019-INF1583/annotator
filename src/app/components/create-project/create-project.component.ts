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
  project = { 'title': '', 'description': '', 'admin': '' };

  constructor(public router: Router, private afs: AngularFirestore) { }

  ngOnInit() {

  }

  create() {
    //this.router.navigate(['project']);
    if (this.project.title != null && this.project.title != '' && this.project.description != null &&
      this.project.description != '') {

      this.project.admin = firebase.auth().currentUser.uid;

      this.afs.collection('Projects/').ref.add({'titre': this.project.title, 'description': this.project.description, 'admin': this.project.admin });

      alert('Création d\' un nouveau projet réussi');
      this.router.navigate(['/']);
    }
  }
}