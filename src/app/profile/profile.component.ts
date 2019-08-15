import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from '../shared/user.model';
import { Role } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    password: '',
    role: Role.Visitor,
    username: '',
    firstname: '',
    lastname: '',
  }
  role: string = '';
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
    const currentUserId = firebase.auth().currentUser.uid;
    this.afs.collection('Users').ref.where('uid', '==', currentUserId).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.user.firstname = doc.get('firstname');
        this.user.lastname = doc.get('lastname');
        this.user.email = doc.get('email');

        if (doc.get('role') === 0) {
          this.user.role = Role.Visitor;
          this.role = 'Visitor';
        }
        else if (doc.get('role') === 1) {
          this.user.role = Role.Member;
          this.role = 'Member';
        }
        else if (doc.get('role') === 2) {
          this.user.role = Role.Adm;
          this.role = 'Administrator';
        }
      });
    });
  }
}
