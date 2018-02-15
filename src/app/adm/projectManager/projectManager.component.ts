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
  displayedColumns = ['titre'];
  projects: Project[] | null;
  userId: string;
  datasource: ProjectDataSource | null;

  constructor(public router: Router, private afs: AngularFirestore) {
    //this.userId = firebase.auth().currentUser.uid;
    //this.getCurrentUserProjects();
     //this.datasource = new ProjectDataSource(this.afs);
  }

  ngOnInit() {
    this.datasource = new ProjectDataSource(this.afs);
    
    //console.log(this.datasource.connect());

  }

  getCurrentUserProjects() {

    /*this.projects = [];
    this.userId = firebase.auth().currentUser.uid;

    this.afs.collection("Projects").ref.where("admin", "==", this.userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        this.projects.push({ admin: doc.data().admin, titre: doc.data().titre, description: doc.data().description, annotators: null, corpus: null, categories: null });

        console.log(doc.id, " => ", doc.data().titre);
      });

    });*/

  }
}

export class ProjectDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }
  userId: string;
  projects: Project[] = [];
  myObservable: Observable<Project[]>;
   //this.userId = firebase.auth().currentUser.uid;
 // mycollection: AngularFirestoreCollection<Project>;

  private subjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  connect(): Observable<any[]> {
    this.userId = firebase.auth().currentUser.uid;
    //this.mycollection = new AngularFirestoreCollection<Project>(null, null);

    this.afs.collection("Projects").ref.where("admin", "==", this.userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        this.projects.push({ admin: doc.data().admin, titre: doc.data().titre, description: doc.data().description, annotators: null, corpus: null, categories: null });
        //this.mycollection.add({ admin: doc.data().admin, titre: doc.data().titre, description: doc.data().description, annotators: null, corpus: null, categories: null });
        console.log(doc.id, " => ", doc.data().titre);
      });

    });

    this.subjects.next(this.projects);
    console.log(this.subjects);


    //console.log(this.projects);
    /*console.log(Observable.of(this.projects));*/

    //this.myObservable = Observable.of(this.projects);
    //this.myObservable.subscribe((value) => { console.log(value); });

    return this.subjects.asObservable();

    //return this.myObservable; //this.subjects.asObservable();

    //return this.afs.collection("Projects").valueChanges();//.ref.where("admin", "==", this.userId).get().then(()).
    //return this.mycollection.valueChanges();

  }
  disconnect(collectionViewer: CollectionViewer): void {

  }

}
