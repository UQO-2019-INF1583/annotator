// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Il permet d’affecter la notion de catégorie à un texte et de le sauvegarder, supprimer une annotation, etc.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { Doc } from '../shared/document.model'
import { AnnotationService } from './annotation.service';
import * as firebase from 'firebase';
import './brat/brat-frontend-editor';
import { collData, docData, options } from './brat/brat-data-mock';
import { Entite } from '../shared/entite.model';
import { HttpClient } from '@angular/common/http';
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
  currentDoc: Doc;
  entities: Entite[];
  currentProjectTitle: string;
  isConnected = false;
  projectId: string;
  private dData: any;
  private cData: any;
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
   * Cette méthode permet de charger les catégories, de les transformer en types d'entités
   * et de les ajouter aux types d'entités existants dans collData
   */
  private addEntityTypes() {
    const newTypes = this.as.getCategoriesAsEntityTypes(this.entities);
    let newType: any;
    newTypes.forEach(function (entity) {
      newType = {};
      for (const property in entity) {
        if (entity.hasOwnProperty(property)) {
          newType[property] = entity[property];
        }
      };
      collData.entity_types.push(newType);
    });
  }

  /**
   * Cette méthode, qui permet d'initialiser l'interface d'annotation, réunit des appels asynchrones qui doivent être exécutés
   * les uns après les autres.
   */
  async getInterfaceData() {
    // Aller chercher les paramètres passés par l'URL
    this.sub = await this.activeRouter.params.subscribe(params => {
      this.currentDoc = new Doc(params.id, params.title, params.projectId);
      this.currentProjectTitle = params.projectTitle;
      this.projectId = params.projectId;
    });
    // Lire le fichier stocké pour en extraire le texte
    const URL = await firebase
      .storage()
      .ref()
      .child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title)
      .getDownloadURL();
    let text = await this.http.get(URL, { responseType: 'text' }).toPromise();
    // split the data
    const bratParams: string[] = text.split('-----');
    text = bratParams[0];


    // Load mock coll and doc if undefined, else, load what has already been saved
    if (typeof (bratParams[1]) === 'undefined' && typeof (bratParams[1]) === 'undefined') {
      this.dData = docData;
      this.cData = collData;
    } else {
      this.dData = JSON.parse(bratParams[1]);
      this.cData = JSON.parse(bratParams[2]);
    }


    this.dData.text = text.replace(/<[^>]*>/g, '');
    console.log(this.dData.text);
    this.entities = await this.as.getEntities(this.projectId).toPromise();

    // Ajouter les catégories comme des types d'entités
    await this.addEntityTypes();

    this.brat = new BratFrontendEditor(document.getElementById('brat'), this.cData, this.dData, options);
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
    let data = this.brat.docData.text;
    const _docData = JSON.stringify(this.brat.docData);
    const _collData = JSON.stringify(this.brat.collData)
    data = data + '-----' + _docData + '-----' + _collData;
    const thefile = new File([data], this.currentDoc.title);

    firebase.storage().ref().child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title).put(thefile);

    alert('Annotation saved');
  }

}
