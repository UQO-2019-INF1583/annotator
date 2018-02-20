import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import {AngularFirestore,
        AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy  {
  currentProject: any;
  private sub: any;
  categoryExist: boolean;

  corpusList: any[] = [];

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {

      this.currentProject = this.afs.collection("Projects/").doc(params.id).ref.get().then((doc) => {
        this.currentProject = doc.data();
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  //Sauvegarde les modification apporté au projet
  saveProjectModification() {
    if (this.currentProject.titre != null && this.currentProject.titre != '' && this.currentProject.description != null &&
      this.currentProject.description != '') {

      this.afs.collection('Projects').doc(this.currentProject.id).set(this.currentProject);

      if (this.corpusList.length > 0) {
        //sauvegarde les documents texte
        for (var i = 0; i < this.corpusList.length; i++) {

          firebase.storage().ref().child('Projets/' + this.currentProject.id + '/' + this.corpusList[i].titre).put(this.corpusList[i].file);
        }
      }

      alert('Modification Sauvegarder');
      this.router.navigate(['/']);
    }

  }


  //ouvre la boîte de dialogue pour ajouter un corpus
  addCorpusDialogBox() {
    let dialogRef = this.dialog.open(AddCorpusComponent, {
      width: '250px',
      data: { corpusTitle: undefined, corpusFile: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.corpusTitle != undefined && result.corpusFile != undefined) {
        this.currentProject.corpus.push({ titre: result.corpusTitle });
        this.corpusList.push({ titre: result.corpusTitle, file: result.corpusFile });

        console.log(this.corpusList);
      }
    });

  }

  //ouvre la boîte de dialogue pour ajouter une catégorie
  addCategorieDialogBox() {
    let dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.categoryName != undefined && result.categoryColor != undefined) {

        this.categoryExist = false;

        for (var i = 0; i < this.currentProject.categories.length; i++) {

          if (result.categoryName == this.currentProject.categories[i].nom) {
            this.categoryExist = true;
            alert("Une catégorie possède déja le même nom");
            return;

          } else if (result.categoryColor == this.currentProject.categories[i].couleur) {
            this.categoryExist = true;
            alert("Une catégorie utilise déjà cette couleur");
            return;
          }
        }

        if (this.categoryExist == false) {
          this.currentProject.categories.push({ id: null, nom: result.categoryName, couleur: result.categoryColor});
        }
      }
    });
  }

}
