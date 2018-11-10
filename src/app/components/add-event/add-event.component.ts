import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../shared/event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  availableColors: object[];

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event) { }

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
