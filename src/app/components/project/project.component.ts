import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import {AngularFirestore,
        AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Doc } from '../../shared/document.model';
import { Categorie } from '../../shared/categorie.model';
import { Project } from '../../shared/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy  {
  currentProject = { 'id': '', 'titre': '', 'description': '', 'admin': '' };
  private sub: any;
  categorylist: Categorie[] = [];
  corpusList: Doc[] = [];
  categoryExist: boolean;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {
      this.currentProject.id = params.id;
      this.currentProject.titre = params.titre;
      this.currentProject.description = params.description;
      this.currentProject.admin = params.admin;
     /* this.currentProject.annotators = params.annotators;
      this.currentProject.corpus = params.corpus;
      this.currentProject.categories = params.categories;*/

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
        this.corpusList.push({ documentId: null, titre: result.corpusTitle, file: result.corpusFile, text: "" });

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

        //Vérifier si une catégorie possède le même nom oèu la même couleur
        for (var i = 0; i < this.categorylist.length; i++) {

          if (result.categoryName == this.categorylist[i].nom) {
            this.categoryExist = true;
            alert("Une catégorie possède déja le même nom");
            return;

          } else if (result.categoryColor == this.categorylist[i].couleur) {
            this.categoryExist = true;
            alert("Une catégorie utilise déjà cette couleur");
            return;
          }
        }

        if (this.categoryExist == false) {
          this.categorylist.push({ nom: result.categoryName, couleur: result.categoryColor });

        }
      }
    });
  }

}
