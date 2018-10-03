import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../shared/project.model';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/security/auth.service';
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
import { ProjectManagerService } from './projectManager.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-adm-projectManager',
  templateUrl: './projectManager.component.html',
  styleUrls: ['./projectManager.component.scss']
})
export class ProjectManagerComponent implements OnInit {
  displayedColumns = [];
  // dataSource: ProjectDataSource | null;
  dataSource: MatTableDataSource<any>;
  isConnected = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    public router: Router,
    private afs: AngularFirestore,
    private manage: ProjectManagerService
  ) {}

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    if (this.isConnected) {
      this.displayedColumns = ['title', 'description', 'modify'];
    } else {
      this.displayedColumns = ['title', 'description'];
    }
    this.manage
      .loadAllproject()
      .valueChanges()
      .subscribe((data: Project[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    // this.dataSource = new ProjectDataSource(this.afs);
  }

  modifyProject(project: any) {
    this.router.navigate(['/project', { id: project.id }]);
  }

  deleteProject(project: any) {
    // ajouter un pop up qui demande si l'utilisateur veut vraiment supprimer le projet
    this.afs
      .collection('Projects')
      .doc(project.id)
      .delete();
  }
}
