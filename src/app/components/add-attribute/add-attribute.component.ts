import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attribute } from '../../shared/attribute.model';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Attribute) { }

  ngOnInit() {
  }

}
