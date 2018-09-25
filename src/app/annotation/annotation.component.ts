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
import './brat-frontend-editor/brat-frontend-editor';
declare var BratFrontendEditor: any;

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss',
'./brat-frontend-editor/brat-frontend-editor.min.css']
})

export class AnnotationComponent implements OnInit, OnDestroy {
  private sub: any;
  currentDoc: Doc;
  categories: string[];
  currentProjectTitle: string;
  isConnected: boolean = false;

  constructor(private authService: AuthService, private activeRouter: ActivatedRoute, private router: Router,
    /*private as: AnnotationService,*/ private ps: ProjectService, private afs: AngularFirestore) {

  }

  ngOnInit() {
    let text = "Ed O'Kelley";
    
	//Données d'initialisation d'example (devront être remplacée par 
	let collData = {
      "messages": [],
      "items": [],
      "ui_names":{
        "entities":"annotation",
        "events":"événements",
        "relations":"relations",
        "attributes":"attributs"
      },
      "search_config": [
        ["Google", "http://www.google.com/search?q=%s"],
        ["Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%s"],
        ["UniProt", "http://www.uniprot.org/uniprot/?sort=score&query=%s"],
        ["EntrezGene", "http://www.ncbi.nlm.nih.gov/gene?term=%s"],
        ["GeneOntology", "http://amigo.geneontology.org/cgi-bin/amigo/search.cgi?search_query=%s&action=new-search&search_constraint=term"],
        ["ALC", "http://eow.alc.co.jp/%s"]
      ],
      "disambiguator_config": [],
      "unconfigured_types":[
        {
          "borderColor":"darken",
          "arrowHead":"triangle,5",
          "name":"Cause",
          "color":"#007700",
          "labels":[
            "Cause"
          ],
          "unused":true,
          "bgColor":"lightgreen",
          "type":"Cause",
          "fgColor":"black"
        }
      ],
      "entity_types": [
        {
          "name": "Person",
          "type"   : "Person",
          "labels" : ["Per", "P"],
          "bgColor": "#FE2E2E",
          "borderColor": "darken",
          //"children": [],
          "unused": false,
          "attributes": [
            "Notorious", "Polarity"
          ],
          "arcs": [{
            "arrowHead": "triangle,5",
            "color": "black",
            "labels": ["Ennemy", "Enn"],
            "dashArray": ",",
            "hotkey": "T",
            "type": "Ennemy",
            "targets": ["Person"]
          },
            {
              "arrowHead": "triangle,5",
              "color": "black",
              "labels": ["Friend", "Fr"],
              "dashArray": ",",
              "hotkey": "T",
              "type": "Friend",
              "targets": ["Person"]
            },
            {
              "arrowHead": "triangle,5",
              "color": "black",
              "labels": ["Destruction", "Dest"],
              "dashArray": ",",
              "hotkey": "T",
              "type": "Destruction",
              "targets": ["Object", "Person"]
            }],
          "children": [
            {
              "name": "Child",
              "type"   : "Child",
              "labels" : ["Child", "Child"],
              "bgColor": "#FE2E2E",
              "borderColor": "darken",
              "children": [
                {
                  "name": "Baby",
                  "type"   : "Baby",
                  "labels" : ["Baby", "Baby"],
                  "bgColor": "#DF7401",
                  "borderColor": "darken",
                  "children": []
                },
                {
                  "name": "Kid",
                  "type"   : "Kid",
                  "labels" : ["Kid", "Kid"],
                  "bgColor": "#FE2E2E",
                  "borderColor": "darken",
                  "children": []
                }
              ]
            }/*,
                       {
                       "name": "Teenager",
                       "type"   : "Person",
                       "labels" : ["Person", "Per"],
                       "bgColor": "#FE2E2E",
                       "borderColor": "darken",
                       "children": [],
                       },
                       {
                       "name": "Adult",
                       "type"   : "Adult",
                       "labels" : ["Adult", "Adult"],
                       "bgColor": "#FE2E2E",
                       "borderColor": "darken",
                       "children": []
                       }*/
          ]
        },
        //null, //will produde <hr> between entity groups or single entities but generate bugs with current code
        {
          "name": "Object",
          "type"   : "Object",
          "labels" : ["Object", "Obj"],
          "bgColor": "#7fa2ff",
          "borderColor": "darken",
          "attributes": [],
          "children": [],
          "unused": false,
          "arcs": [{
            "arrowHead": "triangle,5",
            "color": "black",
            "labels": ["Destruction", "Dest"],
            "dashArray": ",",
            "hotkey": "T",
            "type": "Destruction",
            "targets": ["Object", "Person"]
          }]
        }],
      "event_attribute_types": [
        {
          "labels": null,
          "type":"Confidence",
          "name":"Confidence",
          "unused":false,
          "values":{
            "Certain":{
              "dashArray":","
            },
            "Likely":{
              "dashArray":"3,3"
            },
            "Possible":{
              "dashArray":"3,6"
            }
          }
        },
        {
          "labels": null,
          "type":"BombType", //Renaud, make sure type has no space in it, it is used as a jquery selector class
          "name":"BombType",
          "unused":false,
          "values":{
            "Nuclear bomb": {},
            "Neutron bomb": {},
            "Napalm bomb": {},
            "Hydrogen bomb": {}
          }
        },
        {
          "name": "Epic",
          "type"  : "Epic",
          "values": { "Epic": { "glyph": "★★★" } }
        }
      ],
      "entity_attribute_types": [
        {
          "name": "Notorious",
          "type"  : "Notorious",
          "values": { "Notorious": { "glyph": "★" } }
        },
        {
          "type": "Polarity",
          "name": "Polarity",
          "values": {
            "Positive": {
              "box": "none",
              "glyph": "\n[Polarity:true]",
              "dashArray": "1,2"
            },
            "Negative": {
              "box": "crossed",
              "glyph": "\n[Polarity:false]",
              "dashArray": "3,4"
            }
          }
        }
      ],
      "relation_attribute_types": [
        {
          "labels": null,
          "type":"RelConfidence",
          "name":"Relation Confidence",
          "unused":false,
          "values":{
            "Certain":{
              "dashArray":","
            },
            "Likely":{
              "dashArray":"3,3"
            },
            "Possible":{
              "dashArray":"3,6"
            }
          }
        },
        {
          "name": "Safe",
          "type"  : "Safe",
          "values": { "Safe": {} }
        }
      ],
      "relation_types": [
        {
          "type"     : "Destruction",
          "labels"   : ["Destruction", "Dest"],
          "dashArray": "3,3",
          "color"    : "purple",
          "args"     : [
            {"role": "Destructor", "targets": ["Person", "Object"] },
            {"role": "Destroyed",  "targets": ["Person", "Object"] }
          ]
        },
        {
          "type"     : "Friend",
          "labels"   : ["Friend", "Fr"],
          "dashArray": "3,3",
          "color"    : "purple",
          "attributes": [
            "RelConfidence", "Safe"
          ],
          "args"     : [
            {"role": "From", "targets": ["Person"] },
            {"role": "To",  "targets": ["Person"] }
          ]
        },
        {
          "type"     : "Ennemy",
          "labels"   : ["Ennemy", "Enn"],
          "dashArray": "3,3",
          "color"    : "purple",
          "args"     : [
            {"role": "From", "targets": ["Person"] },
            {"role": "To",  "targets": ["Person"] }
          ]
        },
        {
          "type"     : "Perpetrator",
          "labels"   : ["Perpetrator", "Perp"],
          "dashArray": "3,3",
          "color"    : "purple",
          "args"     : [
            {"role": "From", "targets": ["Assassination"] },
            {"role": "To",  "targets": ["Person"] }
          ]
        }
      ],
      "event_types": [
        {
          "name": "Assassination",
          "type"   : "Assassination",
          "labels" : ["Assassination", "Assas"],
          "bgColor": "lightgreen",
          "borderColor": "darken",
          "attributes": [
            "Epic"
          ],
          "children": [],
          "unused": false,
          "arcs"   : [
            {
              "type": "Victim",
              "labels": [
                "Victim",
                "Vict"
              ],
              targets: [
                "Person"
              ],
            },
            {
              "type": "Perpetrator",
              "labels": [
                "Perpetrator",
                "Perp"
              ],
              targets: [
                "Person"
              ],
              "color": "green"
            }
          ]
        },
        {
          "name": "Bomb",
          "type"   : "Bomb",
          "labels" : ["Bomb", "Bomb"],
          "bgColor": "gold",
          "borderColor": "darken",
          "attributes": [
            "BombType"
          ],
          "children": [],
          "unused": false,
          "arcs"   : [
            {
              "type": "Destroyed",
              "labels": ["Destroyed","Dest"],
              "color": "gold"
            }
          ]
        },
        {
          "name": "Resurrection",
          "type"   : "Resurrection",
          "labels" : ["Resurrection", "Resur"],
          "bgColor": "magenta",
          "borderColor": "darken",
          "attributes": [
            "Epic", "Confidence"
          ],
          "children": [],
          "unused": false,
          "arcs"   : [
            {
              "type": "Resurrected",
              "labels": ["Resurrected","Resur"],
              "color": "magenta"
            },
            {
              //"arrowHead": "triangle,5",
              //"dashArray": ",",
              //"hotkey": "T",
              //"targets": [],
              "type": "Savior",
              "labels": ["Savior","Sav"],
              "color": "magenta"
            }
          ]
        }
      ]
    };

    let docData = {
      "messages": [],
      "source_files": ["ann", "txt"],
      "modifications": [],
      "normalizations": [],
      "ctime": 1351154734.5055847,
      "text"     : "",//"Ed O'Kelley was the man who shot the man who shot Jesse James.\nJ'ai lancé une bombe nucléaire sur Simon, Gustav et Pavel... sans raison particulière. Nos trois comparses se ne pouvant se venger sont allés directement au Paradis. Cette histoire est vraie. Ceci est la fin du paragraphe.\n Ceci est le second paragraphe. C'est l'histoire du petit castor le plus petit, mais le plus fort.",
      "entities" : [
        /*["N1", "Person", [[0, 2], [5, 11]]], //TODO, name text-bound annotations Tn to be coherent with standoff brat format http://brat.nlplab.org/standoff.html
        ["N2", "Person", [[20, 55], [55, 90], [90,124]]],
        ["N3", "Person", [[37, 40]]],
        ["N4", "Object", [[78, 83], [84, 93]]],
        ["N5", "Person", [[98, 104]]],
        ["N6", "Person", [[105, 111]]],
        ["N7", "Person", [[115, 120]]],
        ["N8", "Person", [[50, 61]]]*/
      ],
      "attributes": [
        /*["A1", "Notorious", "N4"],
        ["A2", "Polarity", "N1", "Positive"],
        ["A3", "Polarity", "N2", "Negative"],
        ["A4", "Epic", "T1"],
        ["A5", "Safe", "R1"]*///Relation attributes ignored by client at this point
      ],
      "relations": [
        // ["R1", "Friend", [["From", "N2"], ["To", "N1"]]]
      ],
      "triggers": [
        // ["T1", "Assassination", [[45, 49]]],
        // ["T2", "Resurrection", [[28, 32]]],
        // ["T3", "Bomb", [[78, 93]]]
      ],
      "events": [
        // ["E1", "T1", [["Perpetrator", "N3"], ["Victim", "N8"]]],
        // ["E2", "T2", [["Savior", "N2"], ["Resurrected", "N3"]]],
        // ["E3", "T3", [["Destroyed", "N5"], ["Destroyed", "N6"], ["Destroyed", "N7"]]]
      ],
      "comments":[
        //["N1", "AnnotatorNotes", "test comment"]
      ]
    };

    // Corrigé pour charger correctement les polices (fonts) (Reste à revoir)
    let options = {
      assetsPath: "assets/static/",
      webFontURLs: [//
        'fonts/Astloch-Bold.ttf',
        'fonts/PT_Sans-Caption-Web-Regular.ttf',
        'fonts/Liberation_Sans-Regular.ttf'
      ],
      ajax: 'local',
      overWriteModals: false,
      maxFragmentLength: 30,
      showTooltip: true
    };


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

    // Télécharge le fichier choisi
    firebase.storage().ref().child('Projects/' + this.currentDoc.documentId + '/' + this.currentDoc.title).getDownloadURL().
      then(url => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
          this.currentDoc.file = xhr.response;

          const reader: FileReader = new FileReader();
          reader.onloadend = e => {
            const texthtml = document.getElementById('myText');
            text = reader.result;
            texthtml.innerHTML = text;
          
            console.log(text);
         
			//En ajoutant l'initialisation de Brat ici, on peut s'assurer que le texte aura été chargé avant.
			new BratFrontendEditor(document.getElementById("brat"), collData, docData, options);
          };
          reader.readAsText(this.currentDoc.file);
        };
        xhr.open('GET', url);
        xhr.send();
      }).catch(error => {
        console.log(error);
      });


      console.log(text);
     
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
