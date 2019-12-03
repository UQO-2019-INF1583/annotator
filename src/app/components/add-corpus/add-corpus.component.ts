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

  //method called when a changed is made on the titre input in the dialogRef
  public onChange(value) {
    //create an array of string that contains the titles for the files
    var titles = value.split(",");
    //get the size of the array
    this.titlesSize = titles.length;
    //get how many files is being added
    this.filesSize = this.data.corpusFile.length;
    //if the number of title matches the number of file
    if (this.titlesSize == this.filesSize) {
      for (var i = 0; i < this.titlesSize; i++) {
        if (titles[i] == "") {
          //if one argument is an empty string, the validation is not good
          this.notEnoughtArgument = true;
          break;
        }
        //each file has a title that is not an empty string
        this.notEnoughtArgument = false;
      }
    } else {
      //some file dont have a title
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
          //Pour chacun des fichiers, ajouter l'information dans un array
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
}
