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
  isDataLoaded: boolean;
  ajout: boolean;

  annotateurs: Observable<any[]>;
  categories: Observable<any[]>;
  corpus: Observable<any[]>;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {

      this.currentProject = new Project(params.id, params.title, params.description);

    });

    this.annotateurs = this.getAnnotateur(this.currentProject.id);
    this.categories = this.getCategories(this.currentProject.id);
    this.corpus = this.getCorpus(this.currentProject.id);

    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  getCorpus(projectId: string): Observable<any[]> {
    return this.afs.collection('Corpus', ref => ref.where('projectId', '==', projectId)).valueChanges();
  }

  getCategories(projectId: string): Observable<any[]> {

    return this.afs.collection('Categories', ref => ref.where('projectId', '==', projectId)).valueChanges();

  }

  // Trouve tous les annotateurs du projet
  getAnnotateur(projectId: string): Observable<any[]> {

    const annotateursCollection = this.afs.collection('Annotateurs', ref => ref.where('projectId', '==', projectId));

    const users = annotateursCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();

        const userId = data.userId;

        return this.afs.collection('Users').doc(userId).snapshotChanges().take(1).map(actions => {
          return actions.payload.data();
        }).map(signup => {
          return { id: signup.id, firstName: signup.firstName, lastName: signup.lastName }
        });

      });
    }).flatMap(user => Observable.combineLatest(user));

    return users;
  }

  // Sauvegarde les modification apporté au projet
  saveProjectModification() {
    /*if (this.currentProject.title != null && this.currentProject.title !== '' && this.currentProject.description != null &&
      this.currentProject.description !== '') {

      this.afs.collection('Projects').doc(this.currentProject.id).set(this.currentProject);

      alert('Modification Sauvegarder');
      this.router.navigate(['/']);
    }*/

  }

  corpusSelected(corpus: any) {
    console.log(corpus);
  }

  deleteCategories(categorie: any) {
    console.log(categorie);
    this.afs.collection('Categories').doc(categorie.id).delete();
  }

  deleteAnnotateur(user: any) {
    console.log(user);
    // delete an annotateur
  }


  // ouvre la boîte de dialogue pour ajouter un corpus
  addCorpusDialogBox() {
    const dialogRef = this.dialog.open(AddCorpusComponent, {
      width: '250px',
      data: { corpusTitle: undefined, corpusFile: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.corpusTitle !== undefined && result.corpusFile !== undefined) {

        // est-ce qu'il y a une validation ici a faire? (titre du fichier déjà existant?)

        const corpusId = this.afs.createId();

        this.afs.collection('Corpus').doc(corpusId)
          .set({ 'id': corpusId, 'projectId': this.currentProject.id, 'title': result.corpusTitle });

        firebase.storage().ref().child('Projets/' + corpusId + '/' + result.corpusTitle).put(result.corpusFile);
      }
    });

  }

  // ouvre la boîte de dialogue pour ajouter une catégorie
  addCategorieDialogBox() {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (result.categoryName !== undefined && result.categoryColor !== undefined) {
          this.categoryExist = false;
          this.ajout = true;

          // véfication si la couleur ou le nom de la catégorie est déjà utilisé.
          this.afs.collection('Categories', ref => ref.where('projectId', '==', this.currentProject.id)).valueChanges()
            .subscribe(items => {
              console.log('before' + this.ajout);
              if (this.ajout === true) {
                items.forEach((item: any) => {

                  if (item.color === result.categoryColor) {
                    this.categoryExist = true;
                    console.log('La couleur choisit est déjà utilisé par une autre catégorie');
                  } else if ((item.name as string).toUpperCase() === (result.categoryName as string).toUpperCase()) {
                    this.categoryExist = true;
                    console.log('Le nom choisit est déjà utilisé par une autre catégorie');
                  }
                  console.log(this.categoryExist);
                });

                console.log('before add' + this.ajout);
                if (this.categoryExist === false) {
                  console.log('ajouté');
                  const categorieId = this.afs.createId();
                  // ajoute la nouvelle catégorie
                  this.afs.collection('Categories').doc(categorieId)
                  .set({ 'id': categorieId, 'projectId': this.currentProject.id,
                  'color': result.categoryColor, 'name': result.categoryName });
                  this.ajout = false;
                }
                console.log('after add' + this.ajout);
              }
            });
        }
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter un corpus
  addAnnotateurDialogBox() {
    const dialogRef = this.dialog.open(AddAnnotateurComponent, {
      width: '250px',
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        // manque la validation pour que le même utilisateur ne soit pas mis dans la liste deux fois
        const annotateurId = this.afs.createId();

        this.afs.collection('Annotateurs').doc(annotateurId)
        .set({'id': annotateurId, 'Userid': result.id, 'projectId': this.currentProject.id});

      }
    });

  }

}
