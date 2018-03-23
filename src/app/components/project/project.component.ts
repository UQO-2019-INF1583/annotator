// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Dans le cas de ce module, il s'agit de permettre de visualiser les données du projet et de sauvegarder les
// différents changements que l’utilisateur peut faire.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../shared/project.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddAnnotatorComponent } from '../add-annotator/add-annotator.component';
import { ProjectManagerService } from '../../adm/projectManager';
import { ProjectService } from './project.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {
  currentProject: Project = { id: '', title: '', description: '', admin: [], annotators: [], corpus: [], categories: [] };
  private sub: any;
  categoryExist: boolean;
  isDataLoaded: boolean = false;

  corpusList: any[] = [];
  annotateurs: Observable<any[]>;
  Categories: Observable<any[]>;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router,
              private pm: ProjectManagerService, private ps: ProjectService) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {
      this.pm.getProject(params.id).then((doc) => {
        this.currentProject = doc.data();
      })
    });
    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  getCategories(projectId: string): Observable<any[]> {

    return this.afs.collection('Categories', ref => ref.where('projectId', '==', projectId)).valueChanges();

  }

  //Trouve tous les annotateurs du projet
  getAnnotator(projectId: string): Observable<any[]> {

    var annotateursCollection = this.afs.collection('Annotateurs', ref => ref.where('projectId', '==', projectId));

    var users = annotateursCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();

        const userId = data.id;

        return this.afs.collection('Users').doc(userId).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(signup => {
          return { id: signup.id, firstname: signup.firstname, lastname: signup.lastname }
        });

      });
    }).flatMap(user => Observable.combineLatest(user));

    return users;
  }

  //Sauvegarde les modification apporté au projet
  saveProjectModification() {
    if (this.currentProject.title != null && this.currentProject.title != '' && this.currentProject.description != null &&
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
        this.corpusList.push({ titre: result.corpusTitle, file: result.corpusFile });
        console.log(this.corpusList);
      }
    });

  }

  //ouvre la boîte de dialogue pour ajouter une catégorie
  addCategorieDialogBox() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });
    var categoryExist = false;
    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        if (result.categoryName != undefined && result.categoryColor != undefined) {
          categoryExist = false;

          this.currentProject.categories.forEach((item) => {
            if (item.name == result.categoryName) {
              categoryExist = true;
              if (item.color == result.categoryColor){
                alert("The category already exists");
              }
              else {
                alert("Replacing color");
                item.color = result.categoryColor;
              }
            }
          });

          if (!categoryExist) {
            this.currentProject.categories.push({ name: result.categoryName, color: result.categoryColor});
          }
        }
      }
    });
  }

  deleteCategory(catName: string){
    this.currentProject.categories.forEach((item, index) => {
      if (item.name == catName) {
        this.currentProject.categories.splice(index, 1);
      }
    })
  }

  //ouvre la boîte de dialogue pour ajouter un corpus
  addAnnotateurDialogBox() {
    const dialogRef = this.dialog.open(AddAnnotatorComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        this.ps.addAnnotator(result, this.currentProject.id);
      }
    });

  }

  //ouvre la boîte de dialogue pour ajouter un corpus
  addAdminDialogBox() {
/*
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        this.ps.addAdmin(result, this.currentProject.id);
      }
    });
*/
  }

}
