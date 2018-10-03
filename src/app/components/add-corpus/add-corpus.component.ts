import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop';

@Component({
  selector: 'app-add-corpus',
  templateUrl: './add-corpus.component.html',
  styleUrls: ['./add-corpus.component.scss']
})
export class AddCorpusComponent implements OnInit {
  public files: UploadFile[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCorpusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public fileDropped(event: UploadEvent) {
    this.files = event.files;

    // la variable info contient le document que l'on veux sauvegarder dans la base de données
    for (const file of event.files) {
      file.fileEntry.file(info => {
        // console.log(info);
        this.data.corpusFile = info;
      });
    }
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }
}
