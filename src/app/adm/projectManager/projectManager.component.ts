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
import { ProjectDataSource } from '../../data-sources/projectDataSource';
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
  dataSource: ProjectDataSource | null;

  constructor(public router: Router, private afs: AngularFirestore) { }

  ngOnInit() {
    this.dataSource = new ProjectDataSource(this.afs);
  }

  modifyProject(project: any) {
    this.router.navigate(['/project', {id: project.id}]);
  }

  deleteProject(project: any) {
    //ajouter un pop up qui demande si l'utilisateur veut vraiment supprimer le projet
    this.afs.collection('Projects').doc(project.id).delete();
  }

}
