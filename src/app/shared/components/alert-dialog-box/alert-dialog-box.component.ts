import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog-box',
  templateUrl: './alert-dialog-box.component.html',
  styleUrls: ['./alert-dialog-box.component.scss']
})
export class AlertDialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
