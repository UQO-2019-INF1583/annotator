import { Component, OnInit, Injectable } from '@angular/core';
import { Project } from '../../shared/project.model';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-adm-projectManager',
  templateUrl: './projectManager.component.html',
  styleUrls: ['./projectManager.component.scss']
})


export class ProjectManagerComponent implements OnInit {
  displayedColumns = ['title', 'description', 'modify'];
  datasource: ProjectDataSource | null;

  constructor(public router: Router, private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.datasource = new ProjectDataSource(this.afs);
  }

  modifyProject(project: any) {
    console.log(project);
  }

  deleteProject(project: any) {
    console.log(project);
  }

}

export class ProjectDataSource extends DataSource<any> {

  userId: string;

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    this.userId = firebase.auth().currentUser.uid;
    return this.afs.collection("Projects", ref => ref.where('admin', '==', this.userId)).valueChanges();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
