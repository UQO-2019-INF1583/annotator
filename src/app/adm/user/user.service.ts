import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { User } from '../../shared/user.model';
import { Project } from '../../shared/project.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = new User();

  constructor() { }

  isAdmin(project: Project) {
    return (project.admin.indexOf(this.currentUser.uid) === -1) ? false : true;
  }

  isAnnotator(project: Project) {
    return (project.annotators.indexOf(this.currentUser.uid) === -1) ? false : true;
  }
}
