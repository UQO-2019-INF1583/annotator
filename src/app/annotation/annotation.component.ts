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
  isAdmin: boolean;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute,
    private as: AnnotationService, private http: HttpClient) {
    this.getUserInfo();
  }

  /**
   * Méthode qui retourne l'interface d'annotation brat, si et seulement si elle a été initialisée
   * @returns {any} brat si brat a été initialisé, null sinon
   */
  public getBrat(): any {
    return (this.brat instanceof BratFrontendEditor ? this.brat : null);
  }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.getInterfaceData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.brat = null;
  }

  // Cette méthode permet de charger le document fusionne dans l'interface d'annotation
  async LoadMergedDocument() {
    await this.as.getMergedAnnotatedDocument(this.currentDoc.documentId).then(d => {
      const data = d.data()

      if (data === undefined) {
        alert('Le document demandé n\'existe pas. Cliquez sur fusionner pour en créer un!');
      } else {
        this.annotatedDocument = data;
        this.brat = new BratFrontendEditor(
          document.getElementById('brat'),
          BratUtils.getColDataFromProject(this.project),
          BratUtils.getDocDataFromAnnotatedDocument(this.annotatedDocument),
          options);
        this.filterBrat = new FilterBrat();
        this.filterOptions = FilterOptionsList;
        this.isDataLoaded = true;
      }
    });
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

      // Si le deocument n'a pas ete trouve, on affiche un document vierge.  Sinon on affiche le document trouve.
      if (data === undefined) {
        this.annotatedDocument = AnnotatedDocumentUtils.initialiseAnnotatedDocument(this.currentDoc);
      } else {
        // Application des filtres ici
        // Le document est en version finale, afficher seulement les annotations approuvées
        if (data.etatDocument === 2) {
          data.entities = data.entities.filter(x => x.EtatAnnotation === 1)

          // Le document est vérouillé, désactiver l'enregistrement
          document.getElementById('btnSave').setAttribute('disabled', 'disabled');
        }
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


  // Fonction pour sauvgarder le AnnotatedDocument dans la BD.  Si le document est une copie fusionne alors on affiche une message d'erreur.
  saveTextModification() {
    console.log(this.annotatedDocument.projectId);
    if (this.annotatedDocument.etatDocument === 2) {
      alert('Vous ne pouvez pas ajouter des annotations dans la version fussioné du document');
    } else {
      const aDoc = BratUtils.getAnnotatedDocumentfromDocData(
        this.brat.docData,
        this.project,
        AnnotatedDocumentUtils.initialiseAnnotatedDocument(this.currentDoc)
      );
      this.as.saveAnnotatedDocument(aDoc);
      alert('Annotation enregistrée');
    }
  }

  /*
  Fonction qui nous permet de savoir si l'utilisateur connecte est un administrateur ou pas.
  Si oui, alors on lui permet de cliquer sur les boutons merge et Load Merged Version
  */
  async getUserInfo() {
    const userInfo = await this.as.getUserInfo();
    if (userInfo.data().role === 2) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    return false;
  }

  // Fonction utilise pour mettre les boutons Merge et Load Merged Version en Enable/Diable
  isAdminUser() {
    return !this.isAdmin;
  }

  // Cette fonctionne permet de fussioner tous les AnnotatedDocuments corespondant a un Corpus specifique.
  async mergeAll() {

    // On demande a la base de donne de nous retourner dans un tableau tous les AnnotatedDocuments qui appartient a notre Corpus
    const annotatedDocuments = await this.as.getAllAnnotatedDocumentsForCorpus(this.currentDoc.documentId);
    const mergedDocument = AnnotatedDocumentUtils.initialiseAnnotatedDocument(this.currentDoc);

    // Variable qui va renommer les id de chaque entities/relations/events/attributes afin que brat puisse les afficher
    let entitiesN = 1;
    let relationsN = 1;
    let eventsN = 1;
    let attributesN = 1;


    // Place tout les entities, relation, event et attributes dans un nouveau document
    // tslint:disable-next-line: forin
    for (const docKey in annotatedDocuments) {
      if (!annotatedDocuments[docKey].documentId.includes('MERGED')) {
        mergedDocument.entities = mergedDocument.entities.concat(annotatedDocuments[docKey].entities)
        mergedDocument.relations = mergedDocument.relations.concat(annotatedDocuments[docKey].relations);
        mergedDocument.events = mergedDocument.events.concat(annotatedDocuments[docKey].events);
        mergedDocument.attributes = mergedDocument.attributes.concat(annotatedDocuments[docKey].attributes);

        // Modification des id afin de permettre a Brat d'afficher le document fusionne
        for (const entry of mergedDocument.entities) { entry.id = 'N' + entitiesN++; }
        for (const entry of mergedDocument.relations) { entry.id = 'N' + relationsN++; }
        for (const entry of mergedDocument.events) { entry.id = 'N' + eventsN++; }
        for (const entry of mergedDocument.attributes) { entry.id = 'N' + attributesN++; }

      } // end if
    } // end for

    // Marque le document comme étant barré et final
    mergedDocument.etatDocument = 2;

    // Enregistre le document dans la BD avec le suffix _MERGED a la fin du document
    this.as.saveMergedAnnotatedDocument(mergedDocument);

    // On indique que le document fussione a ete cree
    alert('Le document fusionné a été créé');
  }

}
