import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { DataSource } from '@angular/cdk/collections';
import { UserDataSource } from '../userDataSource.service';
import { UserManagerService } from './userManager.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-adm-userManager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.scss']
})

export class UserManagerComponent implements OnInit {

  displayedColumns = ['email', 'firstname', 'lastname', 'modify'];
  dataSource: UserDataSource | null;

  constructor(public router: Router, private afs: AngularFirestore, private um: UserManagerService) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.afs);
  }

  modifyUser(user: any) {
    this.router.navigate(['/user', user]);
  }

  deleteUser(user: any) {
    //ajouter un pop up qui demande si l'administrateur veut vraiment supprimer l'utilisateur
    this.um.deleteUser(user.uid);
  }

}

/*
export class UserDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    return this.afs.collection("Users", ref => ref.orderBy('email')).valueChanges();
  }

  disconnect(): void {
  }

}
*/