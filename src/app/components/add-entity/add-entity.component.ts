import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Entite } from '../../shared/entite.model';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})

export class AddEntityComponent implements OnInit {
  availableColors: object[];

  constructor(
    public dialogRef: MatDialogRef<AddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entite) { }

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
