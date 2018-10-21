// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Dans le cas de ce module, il s'agit de permettre de visualiser les données du projet et de sauvegarder les
// différents changements que l’utilisateur peut faire.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/security/auth.service';
import { Project } from '../../shared/project.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AddAnnotatorComponent } from '../add-annotator/add-annotator.component';
import { AddAttributeComponent } from '../add-attribute/add-attribute.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddRelationComponent } from '../add-relation/add-relation.component';
import { ProjectManagerService } from '../../adm/projectManager';
import { ProjectService } from './project.service';
import { User } from './../../shared/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import {Attribute} from '../../shared/attribute.model'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {
  currentProject: Project = {id: '', title: '', description: '', admin: [], annotators: [], corpus: [], categories: [], attributes: [], events: [], relations: [] };
  private sub: any;
  isDataLoaded: boolean = false;

  users: Observable<User[]>;
  corpus: Observable<any[]>;
  annotators: any[]; // {uid: v1, email: v2}[]
  admin: any[]; // {uid: v1, email: v2}[]
  attributes: Attribute[];
  events: any[];
  relations: any[];
  isConnected: boolean = false;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router,
              private pm: ProjectManagerService, private ps: ProjectService) { }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.sub = this.activeRouter.params.subscribe(params => {
      this.pm.getProject(params.id).then((doc) => {
        this.currentProject = doc.data();
        this.corpus = this.ps.getCorpus(this.currentProject.id);

        // Initialisation de variables vides, puisqu'on ne les prend pas de FireStore
        this.currentProject.attributes = [];
        this.currentProject.events = [];
        this.currentProject.relations = [];

        if (this.isConnected){
          this.users = this.afs.collection<User>('Users').valueChanges();
          this.getAnnotatorEmail();
          this.getAdminEmail();
        }
        //console.log(this.currentProject)
      })
    });
    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  getAnnotatorEmail() {
    this.annotators = [];
    this.currentProject.annotators.forEach((uid,i) => {
      this.users.forEach((x) => {
        x.forEach((u,j) => {
          if (u.uid == uid) {
            this.annotators.push({email: u.email, uid: u.uid});
          }
        })
      });
    });
  }

  getAdminEmail() {
    this.admin = [];
    this.currentProject.admin.forEach((uid,i) => {
      this.users.forEach((x) => {
        x.forEach((u,j) => {
          if (u.uid == uid) {
            this.admin.push({email: u.email, uid: u.uid});
          }
        })
      });
    });
  }

  // Sauvegarde les modifications apportées au projet.
  saveProjectModification() {
    if (this.currentProject.title != null && this.currentProject.title != '' && this.currentProject.description != null &&
      this.currentProject.description != '') {
      this.afs.collection('Projects').doc(this.currentProject.id).set(this.currentProject);

      this.ps.saveProject(this.currentProject);

      alert('Modification sauvegardé');
      //this.router.navigate(['/']);
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
      data: { categoryName: undefined, type: undefined, etiquettes: undefined, categoryColor: undefined }
    });
    var categoryExists = false;
    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        if (result.categoryName != undefined && result.categoryColor != undefined && result.type != undefined && result.etiquettes != undefined) {

          this.currentProject.categories.forEach((item) => {
            if (item.name === result.categoryName) {
              categoryExists = true;
              if (item.color === result.categoryColor){
                alert("The category already exists");
              }
              else {
                alert("Replacing color");
                item.color = result.categoryColor;
              }
            }
          });

          if (!categoryExists) {
            var etiquettesArray :string[];
            etiquettesArray = result.etiquettes.split(",");
            this.currentProject.categories.push({ name: result.categoryName, type : result.type, color: result.categoryColor, labels: etiquettesArray});
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
      width: '600px',
      height: '600px',
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
          this.annotators.push({uid: result.uid, email: result.email});
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
    this.annotators.forEach((item, index) => {
      if (item.uid == uid) {
        this.annotators.splice(index, 1);
      }
    })
  }

  //ouvre la boîte de dialogue pour ajouter un administrateur
  addAdminDialogBox() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '600px',
      height: '600px',
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
          this.admin.push({uid: result.uid, email: result.email});
        }
        else {
          alert('This admin already exists');
        }
      }
    });
  }

  // Supprime l'admin spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAdmin(uid: string){
    this.currentProject.admin.forEach((item, index) => {
      if (item == uid) {
        this.currentProject.admin.splice(index, 1);
      }
    })
    this.admin.forEach((item, index) => {
      if (item.uid == uid) {
        this.admin.splice(index, 1);
      }
    })
  }

  //ouvre la boîte de dialogue pour ajouter un attribut
  addAttributesDialogBox() {
    const dialogRef = this.dialog.open(AddAttributeComponent, {
      width: '400px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      let attributeExists = false;
      if (result !== undefined && result !== '') {
        this.currentProject.attributes.forEach((item) => {
          if (item.name === result.attributeName) {
            attributeExists = true;
          }
        });
        if (!attributeExists){
          let array = result.valeurs.split(',');
          this.currentProject.attributes.push({name: result.attributeName, type:result.type,valeurs: array});
        }
        else {
          alert('This attribute already exists');
        }
      }
    });
  }

  // Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAttribute(target: Attribute) {
    this.currentProject.attributes.forEach((item, index) => {
      if (item.name === target.name) {
        this.currentProject.attributes.splice(index, 1);
      }
    });
  }

  addRelationDialogBox() {
    const dialogRef = this.dialog.open(AddRelationComponent, {
      width: '400px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      let relationsExists = false;
      if (result !== undefined && result !== '') {
        this.currentProject.relations.forEach((item) => {
          if (item.name === result.relationName) {
            relationsExists = true;
          }
        });
        if (!relationsExists) {
          this.currentProject.relations.push({name: result.relationName, color: result.relationColor});
        }
        else {
          alert('This relation already exists');
        }
      }
    });
  }

  // Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteRelation(target: string) {
    this.currentProject.relations.forEach((item, index) => {
      if (item.name === target.name) {
        this.currentProject.relations.splice(index, 1);
      }
    });
  }


  addEventDialogBox() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      let eventExists = false;
      if (result !== undefined && result !== '') {
        this.currentProject.events.forEach((item) => {
          if (item.name === result.eventName) {
            eventExists = true;
          }
        });
        if (!eventExists) {
          this.currentProject.events.push({name: result.eventName, color: result.eventColor});
        }
        else {
          alert('This event already exists');
        }
      }
    });
  }

  // Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteEvent(target: string) {
    this.currentProject.events.forEach((item, index) => {

      if (item.name === target.name) {
        this.currentProject.events.splice(index, 1);
      }
    })
  }

  // Événement lorsqu'un texte est sélectionné
  documentSelected(doc: any) { doc.projectTitle = this.currentProject.title;
    this.router.navigate(['/annotation', doc ]);
  }

  // Supprime un texte
  deleteCorpus(corpus: any) {
    this.ps.deleteCorpus(corpus.id, corpus.title);
  }
}
