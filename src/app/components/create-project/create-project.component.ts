import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { Project } from '../../shared/project.model';
import { Doc } from '../../shared/document.model';
import { Categorie } from '../../shared/categorie.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  projet: Project = new Project();
  categorylist: Categorie[] = [];
  corpusList: Doc[] = [];
  reader: FileReader = new FileReader;
  categoryExist: boolean;
  updateCat: string;


  constructor(public router: Router, public dialog: MatDialog, private afs: AngularFirestore){  }

  ngOnInit() {
  }

  create() {

    if (this.projet.titre != null && this.projet.titre != '' && this.projet.description != null &&
      this.projet.description != '') {

      this.projet.admin = firebase.auth().currentUser.uid;//JSON.parse(localStorage.getItem('currentUser'));
      this.projet.categories = this.categorylist;
      this.projet.corpus = this.corpusList;

      this.afs.collection('Projects').doc(this.projet.titre).ref.get().then((doc) => {
        if (doc.exists) {
          alert('Un projet ayant le même titre existe déja, donné un autre titre a votre projet');
        }
        else {
          //console.log('document nexiste pas, il va être créer');

          //sauvegarde les information du projet dans la base de données
          doc.ref.set({ 'description': this.projet.description, 'admin': this.projet.admin, 'catégorie': this.projet.categories });

          //sauvegarde les documents texte
          for (var i = 0; i < this.projet.corpus.length; i++) {

            firebase.storage().ref().child('Projets/' + this.projet.titre + '/' + this.projet.corpus[i].titre).put(this.projet.corpus[i].file);
          }
          alert('Création d\' un nouveau projet réussi' );
          this.router.navigate(['/']);
        }
      });/*.catch(function (error) {
          console.log("erreur lors de la connexion a la base de données");
        });  */  
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
