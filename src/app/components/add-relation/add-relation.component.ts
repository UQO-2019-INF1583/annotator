import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css'],
})
export class AddRelationComponent implements OnInit {
  availableColors: object[];

  constructor(
    public dialogRef: MatDialogRef<AddRelationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.availableColors = [
      { nom: 'rouge', couleur: '#F44336' },
      { nom: 'bleu', couleur: '#2196F3' },
      { nom: 'jaune', couleur: '#FFEB3B' },
      { nom: 'vert', couleur: '#4CAF50' },
      { nom: 'violet', couleur: '#673AB7' },
      { nom: 'orange', couleur: '#FF5722' },
    ];
  }
}
