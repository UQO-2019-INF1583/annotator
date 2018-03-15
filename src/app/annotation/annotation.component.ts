// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Il permet d’affecter la notion de catégorie à un texte et de le sauvegarder, supprimer une annotation, etc.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/document.model'
import { AnnotationService } from './annotation.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})

export class AnnotationComponent implements OnInit, OnDestroy {
  private sub: any;
  corpus: Doc;


  constructor(private activeRouter: ActivatedRoute, private router: Router,
    /*private as: AnnotationService,*/ private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {

      this.corpus = new Doc(params.id, params.title, params.projectId);

    });

    firebase.storage().ref().child('Projets/' + this.corpus.documentId + '/' + this.corpus.title).getDownloadURL().
    then(url => {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
          console.log('Loaded');
          this.corpus.file = xhr.response;

          const reader: FileReader = new FileReader();
          reader.onloadend = e => {
            console.log('Read');
            this.corpus.text = reader.result;
          };
          reader.readAsText(this.corpus.file);
         // this.corpus.file = new File([xhr.response], this.corpus.title);
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

  Categoriser() {
    /*let text = '';
    text = window.getSelection().toString();
    console.log('test' + text)*/

    let sel, range, ceci;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
          range = window.getSelection().getRangeAt(0);

          // const html = '<span style="font-weight:bold;">' + range + '</span>'
          const html = '<span style="color: red;">' + range + '</span>'
          range.deleteContents();

          const el = document.createElement('div');
          el.innerHTML = html;
          const frag = document.createDocumentFragment();
          let lastNode;
          while ( (ceci = el.firstChild) ) {
              lastNode = frag.appendChild(ceci);
          }
          range.insertNode(frag);
      }
    } /*else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.collapse(false);
      range.pasteHTML(html);
  }*/


  }

  saveTextModification() {

  }

}
