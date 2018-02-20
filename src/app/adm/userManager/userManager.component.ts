import { Component, OnInit, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-adm-userManager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.scss']
})

export class UserManagerComponent implements OnInit {

  displayedColumns = ['email', 'firstName', 'lastName'];
  dataSource: UserDataSource | null;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.afs);
  }
}


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
