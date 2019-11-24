import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Project } from '../../shared/project.model';
import { User } from '../../shared/user.model';
import { ProjectManagerService } from '../projectManager';
import { ProjectDataSource } from '../../data-sources/projectDataSource';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  displayedColumns = ['title', 'admin', 'annotator'];
  dataSource: ProjectDataSource | null;

  currentUser: User = new User();

  constructor(
    private projectService: ProjectManagerService,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
    this.dataSource = new ProjectDataSource(this.afs);
  }

  getUser(): void {
    const email = this.route.snapshot.paramMap.get('id');
    this.currentUser.email = email;
    // setTimeout(() => {
    this.afs.collection<User>('Users').ref.where('email', '==', email).get()
      .then(users => { users.forEach(u => { this.currentUser.uid = u.get('uid'); }) });
    // }, 300);
  }

  isAdmin(project: Project) {
    return (project.admin.indexOf(this.currentUser.uid) === -1) ? false : true;
  }

  isAnnotator(project: Project) {
    return (project.annotators.indexOf(this.currentUser.uid) === -1) ? false : true;
  }

  changeAdmin(projectId: string, adminId: string, checked: boolean) {
    if (checked) {
      this.projectService.addAdmin(projectId, adminId);
    } else {
      this.projectService.delAdmin(projectId, adminId);
    }
  }

  changeAnnotator(projectId: string, userId: string, checked: boolean) {
    if (checked) {
      this.projectService.addAnnotator(projectId, userId);
    } else {
      this.projectService.delAnnotator(projectId, userId);
    }
  }

  updateProject(projectId: string) {
    this.afs.collection('Project').doc(projectId).set(this.currentUser)
      .then(function () {
        console.log('Document written with ID ');
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
}
