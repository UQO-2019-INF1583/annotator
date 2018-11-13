import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Relation } from '../../shared/relation.model';
import { availableColorsList } from '../../shared/sharedProperties.model';

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css'],
})
export class AddRelationComponent implements OnInit {
  availableColors: string[];

  constructor(
    public dialogRef: MatDialogRef<AddRelationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Relation) { }

  ngOnInit() {
    this.availableColors = availableColorsList;
  }
}
