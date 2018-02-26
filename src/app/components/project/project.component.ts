import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../shared/project.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddAnnotateurComponent } from '../add-annotateur/add-annotateur.component';
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
  currentProject: Project;
  private sub: any;
  categoryExist: boolean;
  isDataLoaded: boolean = false;

  corpusList: any[] = [];
  annotateurs: Observable<any[]>;
  Categories: Observable<any[]>;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {

      this.currentProject = new Project(params.id, params.title, params.description);

    });

    this.annotateurs = this.getAnnotateur(this.currentProject.id);
    this.Categories = this.getCategories(this.currentProject.id);

    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  getCategories(projectId: string): Observable<any[]> {

    return this.afs.collection('Categories', ref => ref.where('projectId', '==', projectId)).valueChanges();

  }

  //Trouve tous les annotateurs du projet
  getAnnotateur(projectId: string): Observable<any[]> {

    var annotateursCollection = this.afs.collection('Annotateurs', ref => ref.where('projectId', '==', projectId));

    var users = annotateursCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();

        const userId = data.id;

        return this.afs.collection('Users').doc(userId).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(signup => {
          return { id: signup.id, firstName: signup.firstName, lastName: signup.lastName }
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
    let dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        if (result.categoryName != undefined && result.categoryColor != undefined) {
          this.categoryExist = false;

          this.Categories.subscribe((items) => {

            items.forEach((item) => {

              this.categoryExist = true;

             /* if (item.name == result.categoryName) {
                this.categoryExist = true;
                alert("Une catégorie possède déja le même nom");
                //return;
              }
              else if (item.color == result.categoryColor) {
                this.categoryExist = true;
                alert("Une catégorie utilise déjà cette couleur");
                //return;
              }*/
            });
          });

          console.log(this.categoryExist);

          if (this.categoryExist == false) {
            //this.currentProject.categories.push({ id: null, nom: result.categoryName, couleur: result.categoryColor});

            //var categorieId = this.afs.createId();

            //this.afs.collection('Categories').add({ 'id': categorieId, 'projectId': this.currentProject.id, 'color': result.categoryColor, 'name': result.categoryName });
          }
        }
      }
    });

  }

  //ouvre la boîte de dialogue pour ajouter un corpus
  addAnnotateurDialogBox() {
    let dialogRef = this.dialog.open(AddAnnotateurComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        //this.currentProject.annotateurs.push({ 'id': result.id, 'firstName': result.firstName, 'lastName': result.lastName });

      }
    });

  }

}
