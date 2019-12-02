/* to do; mettre à jour cette classe */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  NgxFileDropModule,
  NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry
} from 'ngx-file-drop';
import undefined = require('firebase/empty-import');

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
  titlesSize: number;//number of titles
  filesSize: number;//number of files
  notEnoughtArgument = true;
  progress: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCorpusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isNotValid = true;
    this.progress = false;
  }

  public onChange(value) {
    var titles = value.split(",");
    this.titlesSize = titles.length;
    this.filesSize = this.data.corpusFile.length;
    console.log(this.titlesSize);
    console.log(this.data.corpusFile.length);
    if (this.titlesSize == this.filesSize) {
      for (var i = 0; i < this.titlesSize; i++) {
        if (titles[i] == "") {
          this.notEnoughtArgument = true;
          break;
        }
        this.notEnoughtArgument = false;
      }
    } else {
      console.log("error");
      this.notEnoughtArgument = true;
    }
  }

  public fileDropped(files: NgxFileDropEntry[]) {
    this.files = files;
    var i = 0;
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
          this.data.corpusFile[i] = info;
          i++;
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

  public validateNames() {
    var titles = this.data.corpusTitle.split(",");
    if (titles.size == this.data.corpusFile.size) {
      this.isNotValid = false;
      return false;
    } else {
      this.isNotValid = true;
      return true;
    }
  }
}
