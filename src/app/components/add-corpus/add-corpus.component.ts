import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadFile, UploadEvent } from 'ngx-file-drop';

@Component({
  selector: 'app-add-corpus',
  templateUrl: './add-corpus.component.html',
  styleUrls: ['./add-corpus.component.scss']
})

export class AddCorpusComponent implements OnInit {
  public files: UploadFile[] = [];
  isValid = false;

  constructor(
    //  public dialogRef: MatDialogRef<AddCorpusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  public fileDropped(event: UploadEvent) {
    console.log(event);
    this.files = event.files;

    // la variable info contient le document que l'on veux sauvegarder dans la base de données
    for (const droppedFile of event.files) {
      droppedFile.fileEntry.file(info => {
        console.log(info);
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry;

          const fileName = droppedFile.relativePath;
          const fileExt = fileName.split(".").pop();
          //Verification du depot de document text
          if (fileExt != "txt") {
            this.isValid = true;
          } else {
            this.isValid = false;
          }
        }

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
