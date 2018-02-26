import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-annotateur',
  templateUrl: './add-annotateur.component.html',
  styleUrls: ['./add-annotateur.component.scss']
})

export class AddAnnotateurComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'add'];
  datasource: UsersDataSource | null;

  constructor(
    public dialogRef: MatDialogRef<AddAnnotateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private afs: AngularFirestore ) { }

  ngOnInit() {
    //initialize la datasource pour la mat-table
    this.datasource = new UsersDataSource(this.afs);
  }
}

export class UsersDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    return this.afs.collection('Users').valueChanges();
  }

  disconnect(): void {

  }

}
