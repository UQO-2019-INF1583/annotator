import { Component, OnInit, Injectable } from '@angular/core';
import { Project } from '../../shared/project.model';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-adm-projectManager',
  templateUrl: './projectManager.component.html',
  styleUrls: ['./projectManager.component.scss']
})


export class ProjectManagerComponent implements OnInit {
  displayedColumns = ['titre', 'description', 'modifier'];
  datasource: ProjectDataSource | null;

  constructor(public router: Router, private afs: AngularFirestore) {
  }

  ngOnInit() {
    //initialize la datasource pour la mat-table
    this.datasource = new ProjectDataSource(this.afs);

  }

  modifyProject(project: any) {
    this.router.navigate(['/project', project]);
  }

  deleteProject(project: any) {
    //ajouter un pop up qui demande si l'utilisateur veut vraiment supprimer le projet
    this.afs.collection('Projects').doc(project.id).delete();
  }

}

export class ProjectDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }
  userId: string;

  connect(): Observable<any[]> {
    //trouve le id the l'utilisateur connecter
    this.userId = firebase.auth().currentUser.uid;

    //trouve les projets où l'utilisateur connecter est l'administrateur
    return this.afs.collection("Projects", ref => ref.where('admin', '==', this.userId)).valueChanges();
  }
  disconnect(): void {

  }

}
