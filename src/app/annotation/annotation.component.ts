// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Il permet d’affecter la notion de catégorie à un texte et de le sauvegarder, supprimer une annotation, etc.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { Doc } from '../shared/document.model'
import { AnnotationService } from './annotation.service';
import * as firebase from 'firebase';
import './brat/brat-frontend-editor';
import { options } from './brat/brat-data-mock';
import { Entite } from '../shared/entite.model';
import { HttpClient } from '@angular/common/http';
import { AnnotatedDocument, AnnotatedDocumentUtils } from '../shared/annotated-document.model';
import { Project, ProjectUtils } from '../shared/project.model';

declare var BratFrontendEditor: any;

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  providers: [AnnotationService]
})

export class AnnotationComponent implements OnInit, OnDestroy {
  private sub: any;
  private brat: any;
  private project: Project;
  private annotatedDocument: AnnotatedDocument;
  currentDoc: Doc;
  entities: Entite[];
  currentProjectTitle: string;
  isConnected = false;
  projectId: string;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute,
    private as: AnnotationService, private http: HttpClient) {

  }

  /**
   * Méthode qui retourne l'interface d'annotation brat, si et seulement si elle a été initialisée
   * @returns {any} brat si brat a été initialisé, null sinon
   */
  public getBrat(): any {
    return (this.brat instanceof BratFrontendEditor ? this.brat : null);
  }

  /**
   * Cette méthode, qui permet d'initialiser l'interface d'annotation, réunit des appels asynchrones qui doivent être exécutés
   * les uns après les autres.
   */
  async getInterfaceData() {
    this.sub = await this.activeRouter.params.subscribe(params => {
      this.currentDoc = new Doc(params.id, params.title, params.projectId);
      this.currentProjectTitle = params.projectTitle;
      this.projectId = params.projectId;
    });

    await this.as.getProject(this.projectId).then(p => this.project = p.data());

    await this.as.getAnnotatedDocument(this.currentDoc.documentId).then(d => {
      this.annotatedDocument = d.data();

      if (this.annotatedDocument === null || this.annotatedDocument === undefined) {
        this.annotatedDocument = new AnnotatedDocument(this.currentDoc);
      }
    });

    console.log(ProjectUtils.toJSON(this.project));

    this.brat = new BratFrontendEditor(
      document.getElementById('brat'),
      JSON.parse(ProjectUtils.toJSON(this.project)),
      JSON.parse(AnnotatedDocumentUtils.toJSON(this.annotatedDocument)),
      options);
  }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();

    this.getInterfaceData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.brat = null;
  }

  saveTextModification() {
    const annotatedDocument = AnnotatedDocumentUtils
      .fromJSON(
        this.brat.docData,
        this.project,
        new AnnotatedDocument(this.currentDoc));

    this.as.saveAnnotatedDocument(annotatedDocument);

    alert('Annotation saved');
  }

}
