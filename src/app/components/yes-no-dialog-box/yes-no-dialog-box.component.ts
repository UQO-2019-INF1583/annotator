import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-yes-no-dialog-box',
  templateUrl: './yes-no-dialog-box.component.html',
  styleUrls: ['./yes-no-dialog-box.component.css']
})
export class YesNoDialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
