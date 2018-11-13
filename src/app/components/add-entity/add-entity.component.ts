import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Entity } from '../../shared/entity.model';
import { availableColorsList } from '../../shared/sharedProperties.model';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})

export class AddEntityComponent implements OnInit {
  availableColors: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entity) { }

  ngOnInit() {
    this.availableColors = availableColorsList;
  }
}
