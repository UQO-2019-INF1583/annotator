import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { UsersDataSource } from '../../data-sources/usersDataSource';

@Component({
  selector: 'app-add-annotator',
  templateUrl: './add-annotator.component.html',
  styleUrls: ['./add-annotator.component.scss']
})

export class AddAnnotatorComponent implements OnInit {
  displayedColumns = ['uid', 'email', 'firstname', 'lastname', 'add'];
  datasource: UsersDataSource | null;

  constructor(
    public dialogRef: MatDialogRef<AddAnnotatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private afs: AngularFirestore) { }

  ngOnInit() {
    // initialize la datasource pour la mat-table
    this.datasource = new UsersDataSource(this.afs);
  }
}

