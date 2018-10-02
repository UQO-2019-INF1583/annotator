import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  availableColors: object[];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.availableColors = [
      { nom: 'rouge', couleur: '#F44336' },
      { nom: 'bleu', couleur: '#2196F3' },
      { nom: 'jaune', couleur: '#FFEB3B' },
      { nom: 'vert', couleur: '#4CAF50' },
      { nom: 'violet', couleur: '#673AB7' },
      { nom: 'orange', couleur: '#FF5722' }
    ];
  }
}
