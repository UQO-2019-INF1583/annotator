import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { UsersDataSource } from '../../data-sources/usersDataSource';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})

export class AddAdminComponent implements OnInit {
  displayedColumns = ['uid', 'email', 'firstname', 'lastname', 'add'];
  datasource: UsersDataSource | null;

  constructor(
    public dialogRef: MatDialogRef<AddAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private afs: AngularFirestore) { }

  ngOnInit() {
    // initialize la datasource pour la mat-table
    this.datasource = new UsersDataSource(this.afs);
  }
}
