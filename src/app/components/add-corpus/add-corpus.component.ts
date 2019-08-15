/* to do; mettre à jour cette classe */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxFileDropModule/*, UploadFile, UploadEvent*/, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-corpus',
  templateUrl: './add-corpus.component.html',
  styleUrls: ['./add-corpus.component.scss']
})

export class AddCorpusComponent implements OnInit {
/*
  public files: UploadFile[] = [];
  isExtValid = false;
  isSizeValid = false;
*/
  isNotValid: boolean;
  progress: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCorpusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isNotValid = true;
    this.progress = false;
  }
  public fileDropped(files: NgxFileDropEntry[]) {

  }
/*
  public fileDropped(event: UploadEvent) {
    console.log(event);
    this.files = event.files;
    this.isNotValid = true;
    this.progress = true;
    // la variable info contient le document que l'on veux sauvegarder dans la base de données
    for (const droppedFile of event.files) {
      droppedFile.fileEntry.file(info => {
        console.log(info);
        if (droppedFile.fileEntry.isFile) {
          const fileName = droppedFile.relativePath;
          const fileExt = fileName.split(".").pop();
          //Verification du depot de document text
          if (fileExt != "txt") {
            this.isExtValid = true;
            this.progress = false;
          } else if (info.size == 0) {
            this.progress = false;
            this.isSizeValid = true;
          } else {
            this.progress = false;
            this.isNotValid = false;
            this.isExtValid = false;
          }
        }

        // console.log(info);
        this.data.corpusFile = info;
      });
    }
  }
*/
  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

}
