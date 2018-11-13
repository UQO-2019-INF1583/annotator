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
import { Entity } from '../shared/entity.model';
import { FilterBrat } from '../shared/filterBrat.model';
import { FilterOptionsList } from '../shared/filterOptions.model';
import { HttpClient } from '@angular/common/http';
import { AnnotatedDocument, AnnotatedDocumentUtils } from '../shared/annotated-document.model';
import { Project, ProjectUtils } from '../shared/project.model';
import { BratUtils } from './brat/brat-utils';

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
  availableColors: string[];
  currentDoc: Doc;
  filterBrat: FilterBrat;
  filterOptions: string[];
  entities: Entity[];
  currentProjectTitle: string;
  isConnected = false;
  projectId: string;
  isDataLoaded = false;
  customCssHtml: string;

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
      this.currentProjectTitle = params.projectTitle;
      this.currentDoc = new Doc(params.id, params.title, params.projectId);
      this.projectId = params.projectId;
    });

    await this.as.getProject(this.projectId).then(p => this.project = p.data());

    const URL = await firebase
      .storage()
      .ref()
      .child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title)
      .getDownloadURL();

    this.currentDoc.text = await this.http.get(URL, { responseType: 'text' }).toPromise();

    await this.as.getAnnotatedDocument(this.currentDoc.documentId).then(d => {
      const data = d.data()

      if (data === undefined) {
        this.annotatedDocument = AnnotatedDocumentUtils.fromDoc(this.currentDoc);
      } else {
        this.annotatedDocument = data;
      }
    });

    this.brat = new BratFrontendEditor(
      document.getElementById('brat'),
      BratUtils.getColDataFromProject(this.project),
      BratUtils.getDocDataFromAnnotatedDocument(this.annotatedDocument),
      options);

	this.filterBrat = new FilterBrat();
	this.filterOptions = FilterOptionsList;

	this.isDataLoaded = true;

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
    const aDoc = BratUtils.getAnnotatedDocumentfromDocData(
      this.brat.docData,
      this.project,
      AnnotatedDocumentUtils.fromDoc(this.currentDoc)
    );

    this.as.saveAnnotatedDocument(aDoc);

    alert('Annotation saved');
  }

  customCSS () {
	const head=document.getElementsByTagName('head')[0];
	const oldFilter=document.getElementById("custom-css");
	if (oldFilter){
		head.removeChild(oldFilter);
	}
	const newFilter=document.createElement("style");
	newFilter.type="text/css";
	newFilter.id="custom-css";
    this.customCssHtml = '';
    this.customCssHtml += "#brat .span_"+this.filterBrat.value+"{";
    this.customCssHtml += "stroke-width: 3 !important;";
    this.customCssHtml += "}";
    newFilter.appendChild(document.createTextNode(this.customCssHtml));
	head.appendChild(newFilter);
  }
}
