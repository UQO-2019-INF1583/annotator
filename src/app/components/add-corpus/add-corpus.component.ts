/* to do; mettre à jour cette classe */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxFileDropModule,
         NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry
       } from 'ngx-file-drop';

@Component({
  selector: 'app-add-corpus',
  templateUrl: './add-corpus.component.html',
  styleUrls: ['./add-corpus.component.scss']
})

export class AddCorpusComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  isExtValid = false;	//Is it used?
  isSizeValid = false;	//Is it used?
  isNotValid: boolean;	//Is it used?
  progress: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCorpusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isNotValid = true;
    this.progress = false;
  }
  public fileDropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(info => {
          console.log(info);
          const fileName = droppedFile.relativePath;
          const fileExt = fileName.split(".").pop();
          //Vérification du dépôt de document text
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
          this.data.corpusFile = info;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

}
