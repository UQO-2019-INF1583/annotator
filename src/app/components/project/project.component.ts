import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../shared/project.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddAnnotateurComponent } from '../add-annotateur/add-annotateur.component';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {
  currentProject: Project;
  private sub: any;
  isDataLoaded: boolean;

  annotateurs: Observable<any[]>;
  categories: Observable<any[]>;
  corpus: Observable<any[]>;

  constructor(private activeRouter: ActivatedRoute, public dialog: MatDialog, private ps: ProjectService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {

      this.currentProject = new Project(params.id, params.title, params.description);

    });

    this.annotateurs = this.ps.getAnnotateur(this.currentProject.id);
    this.categories = this.ps.getCategories(this.currentProject.id);
    this.corpus = this.ps.getCorpus(this.currentProject.id);

    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  // Sauvegarde les modification apporté au projet
  saveProjectModification() {
    if (this.currentProject.title != null && this.currentProject.title !== '' && this.currentProject.description != null &&
      this.currentProject.description !== '') {

      this.ps.saveProject(this.currentProject);

      alert('Modification Sauvegarder');
      // this.router.navigate(['/']);
    }

  }

  // Événement lorsqu'un texte est sélectionné
  corpusSelected(corpus: any) {
    console.log(corpus);
  }

  // Supprime un texte
  deleteCorpus(corpus: any) {
    console.log(corpus);
    // pas implémenté pour le moment
    // this.ps.deleteCorpus(corpus.id);
  }

  // Supprime une catégorie
  deleteCategories(categorie: any) {
    this.ps.deleteCategories(categorie.id);
  }

  // Supprime un annotateur
  deleteAnnotateur(user: any) {
    this.ps.deleteAnnotateur(user.id, this.currentProject.id);
  }


  // ouvre la boîte de dialogue pour ajouter un corpus
  addCorpusDialogBox() {
    const dialogRef = this.dialog.open(AddCorpusComponent, {
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

  // ouvre la boîte de dialogue pour ajouter une catégorie
  addCategorieDialogBox() {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '250px',
      data: { categoryName: undefined, categoryColor: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (result.categoryName !== undefined && result.categoryColor !== undefined) {

          this.ps.addCategorie(result, this.currentProject.id);
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

        this.ps.addAnnotateur(result, this.currentProject.id);
      }
    });

  }

}
