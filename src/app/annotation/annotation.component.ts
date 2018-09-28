// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Il permet d’affecter la notion de catégorie à un texte et de le sauvegarder, supprimer une annotation, etc.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { Doc } from '../shared/document.model'
import { Project } from '../shared/project.model'
import { AnnotationService } from './annotation.service';
import { ProjectService } from '../components/project/project.service';
import { CategoryService } from './category.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';
import * as firebase from 'firebase';
import './brat/brat-frontend-editor';
import {collData, docData, options} from './brat/brat-data-mock';
import {Category} from './Category';
import {HttpClient} from '@angular/common/http';
declare var BratFrontendEditor: any;

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  providers: [CategoryService]
})

export class AnnotationComponent implements OnInit, OnDestroy {
  private sub: any;
  private brat: any;
  currentDoc: Doc;
  categories: Category[];
  currentProjectTitle: string;
  isConnected = false;
  projectId: string;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, private router: Router,
              /*private as: AnnotationService,*/ private ps: ProjectService, private afs: AngularFirestore,
              private categs: CategoryService, private storage: AngularFireStorage, private http: HttpClient) {

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
    const URL = await firebase.storage().ref().child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title).getDownloadURL();
    let text = await this.http.get(URL, {responseType: 'text'}).toPromise();
    // Interface d'annotation actuelle
    const texthtml = document.getElementById('myText');
    texthtml.innerHTML = text;
    // Pour l'interface de brat
    docData.text = text.replace(/<[^>]*>/g, '');
    // Charge les catégories du projet de façon asynchrone à l'aide du service CategoryService
    this.categories = await this.categs.getCategories(this.projectId).toPromise();
    // Finalement initialiser brat
    this.brat = new BratFrontendEditor(document.getElementById('brat'), collData, docData, options);
  }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.getInterfaceData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }

  Categoriser(couleur: string) {

    let sel, range, ceci;
    if (window.getSelection) {
      sel = window.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        if (sel.getRangeAt(0).commonAncestorContainer.parentNode.id === 'myText' ||
          sel.getRangeAt(0).commonAncestorContainer.parentNode.parentNode.id === 'myText'
        || sel.getRangeAt(0).commonAncestorContainer.id === 'myText') {

          console.log('mytext');
          if (couleur !== 'Delete') {
            range = sel.getRangeAt(0);
            console.log('1. new insert not removing old span...');

            const newSpan = document.createElement('span');
            newSpan.style.fontWeight = 'bold';
            newSpan.style.color = couleur;
            newSpan.innerText = range.cloneContents().textContent;

            range.deleteContents();

            if (sel.getRangeAt(0).commonAncestorContainer.parentNode.id !== 'myText' &&
            sel.getRangeAt(0).commonAncestorContainer.id !== 'myText') {
              range.commonAncestorContainer.parentNode.parentNode
                .removeChild(range.commonAncestorContainer.parentNode);
            }

            range.insertNode(newSpan);

          } else if (couleur === 'Delete') {
            range = window.getSelection().getRangeAt(0);
            console.log('2. delete');

            const html = range.cloneContents().textContent
            range.deleteContents();

            if (sel.getRangeAt(0).commonAncestorContainer.parentNode.id !== 'myText' &&
            sel.getRangeAt(0).commonAncestorContainer.id !== 'myText') {
              range.commonAncestorContainer.parentNode.parentNode
                .removeChild(range.commonAncestorContainer.parentNode);
            }

            const el = document.createElement('div');
            el.innerHTML = html;
            const frag = document.createDocumentFragment();
            let lastNode;
            while ((ceci = el.firstChild)) {
              lastNode = frag.appendChild(ceci);
            }
            range.insertNode(frag);

          }
        }
      }
    }
  }

  saveTextModification() {
    const data = document.getElementById('myText').innerHTML;
    const thefile = new File([data], this.currentDoc.title)

    firebase.storage().ref().child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title).put(thefile);

    alert('Annotation saved');
  }

}
