// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Il permet d’affecter la notion de catégorie à un texte et de le sauvegarder, supprimer une annotation, etc.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
import { Doc } from '../shared/document.model'
import { Project } from '../shared/project.model'
import { AnnotationService } from './annotation.service';
import { ProjectService } from '../components/project/project.service'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { BratFrontendEditor } from './brat-frontend-editor';


@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss',
'brat-frontend-editor.min.css']
})

export class AnnotationComponent implements OnInit, OnDestroy {
  private sub: any;
  currentDoc: Doc;
  categories: string[];
  currentProjectTitle: string;
  isConnected: boolean = false;;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, private router: Router,
    /*private as: AnnotationService,*/ private ps: ProjectService, private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.sub = this.activeRouter.params.subscribe(params => {
      this.currentDoc = new Doc(params.id, params.title, params.projectId);
      this.currentProjectTitle = params.projectTitle;

      // Charge les catégories du projet
      var projectRef = this.afs.collection<Project>('Projects').doc(params.projectId);
      projectRef.ref.get().then( (documentSnapshot) => {
        this.categories = documentSnapshot.data().categories;
      });
    });

    // Charge les catégories du projet
    //this.categories = this.ps.getCategories(this.currentDoc.projectId);

    // Télécharge le fichier choisi
    firebase.storage().ref().child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title).getDownloadURL().
      then(url => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
          this.currentDoc.file = xhr.response;

          const reader: FileReader = new FileReader();
          reader.onloadend = e => {
            // this.currentDoc.text = reader.result;
            const texthtml = document.getElementById('myText');
            texthtml.innerHTML = reader.result;
          };
          reader.readAsText(this.currentDoc.file);
          // this.currentDoc.file = new File([xhr.response], this.currentDoc.title);
        };
        xhr.open('GET', url);
        xhr.send();
      }).catch(error => {
        console.log(error);
      });
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
