// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Dans le cas de ce module, il s'agit de permettre de visualiser les données du projet et de sauvegarder les
// différents changements que l’utilisateur peut faire.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../shared/project.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddAdminComponent } from '../add-admin/add-admin.component';
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
  isDataLoaded: boolean = false;

  //annotateurs: Observable<any[]>;
  //categories: Observable<any[]>;
  corpus: Observable<any[]>;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router,
              private pm: ProjectManagerService, private ps: ProjectService) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {
      this.pm.getProject(params.id).then((doc) => {
        this.currentProject = doc.data();
        this.corpus = this.ps.getCorpus(this.currentProject.id);
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

  // Sauvegarde les modifications apportées au projet.
  saveProjectModification() {
    if (this.currentProject.title != null && this.currentProject.title != '' && this.currentProject.description != null &&
      this.currentProject.description != '') {
      this.afs.collection('Projects').doc(this.currentProject.id).set(this.currentProject);

      this.ps.saveProject(this.currentProject);

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
      if (result !== undefined) {
        if (result.corpusTitle !== undefined && result.corpusFile !== undefined) {

          // est-ce qu'il y a une validation ici a faire? (titre du fichier déjà existant?)
          this.ps.addCorpus(result, this.currentProject.id);
        }
      }
    });

  }

  //ouvre la boîte de dialogue pour ajouter une catégorie
  addCategorieDialogBox() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });
    var categoryExists = false;
    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        if (result.categoryName != undefined && result.categoryColor != undefined) {
          categoryExists = false;

          this.currentProject.categories.forEach((item) => {
            if (item.name == result.categoryName) {
              categoryExists = true;
              if (item.color == result.categoryColor){
                alert("The category already exists");
              }
              else {
                alert("Replacing color");
                item.color = result.categoryColor;
              }
            }
          });

          if (!categoryExists) {
            this.currentProject.categories.push({ name: result.categoryName, color: result.categoryColor});
          }
        }
      }
    });
  }

  // Supprime la catégorie spécifiée dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteCategory(catName: string){
    this.currentProject.categories.forEach((item, index) => {
      if (item.name == catName) {
        this.currentProject.categories.splice(index, 1);
      }
    })
  }

  //ouvre la boîte de dialogue pour ajouter un annotateur
  addAnnotatorDialogBox() {
    const dialogRef = this.dialog.open(AddAnnotatorComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      var annotatorExists = false;
      if (result !== undefined) {
        this.currentProject.annotators.forEach((item) => {
          if (item == result.uid) {
            annotatorExists = true;
          }
        })
        if (!annotatorExists){
          this.currentProject.annotators.push(result.uid);
        }
        else {
          alert('This annotator already exists');
        }
      }
    });
  }

  // Supprime l'annotateur spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAnnotator(uid: string){
    this.currentProject.annotators.forEach((item, index) => {
      if (item == uid) {
        this.currentProject.annotators.splice(index, 1);
      }
    })
  }

  //ouvre la boîte de dialogue pour ajouter un administrateur
  addAdminDialogBox() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      var adminExists = false;
      if (result !== undefined) {
        this.currentProject.admin.forEach((item) => {
          if (item == result.uid) {
            adminExists = true;
          }
        })
        if (!adminExists){
          this.currentProject.admin.push(result.uid);
        }
        else {
          alert('This admin already exists');
        }
      }
    });
  }

  // Événement lorsqu'un texte est sélectionné
  corpusSelected(corpus: any) {
    this.router.navigate(['/annotation', corpus]);
  }

  // Supprime un texte
  deleteCorpus(corpus: any) {
    this.ps.deleteCorpus(corpus.id, corpus.title);
  }
}
