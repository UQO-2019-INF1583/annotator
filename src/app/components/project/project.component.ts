// Rôle : Ce module a pour rôle de faire la liaison entre la vue du composant et les données envoyées par le service.
// Dans le cas de ce module, il s'agit de permettre de visualiser les données du projet et de sauvegarder les
// différents changements que l’utilisateur peut faire.

import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AddAnnotatorComponent } from '../add-annotator/add-annotator.component';
import { AddAttributeComponent } from '../add-attribute/add-attribute.component';
import { AddEntityComponent } from '../add-entity/add-entity.component';
import { AddCorpusComponent } from '../add-corpus/add-corpus.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddRelationComponent } from '../add-relation/add-relation.component';
import { Attribute } from '../../shared/attribute.model';
import { AuthService } from '../../shared/security/auth.service';
import { Event } from '../../shared/event.model';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectUtils } from '../../shared/project.model';
import { ProjectService } from './project.service';
import { Relation } from '../../shared/relation.model';
import { User } from './../../shared/user.model';
import { YesNoDialogBoxComponent } from '../yes-no-dialog-box/yes-no-dialog-box.component';
import { AlertDialogBoxComponent } from '../../shared/components/alert-dialog-box/alert-dialog-box.component';
import { Entity } from '../../shared/entity.model';
import { Injectable } from '@angular/core';
import { darkColors } from '../../shared/sharedProperties.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
@Injectable()
export class ProjectComponent implements OnInit, OnDestroy {
  currentProject: Project = ProjectUtils.generateEmpty();
  private sub: any;
  isDataLoaded = false;
  isProjectModified = false;
  users: Observable<User[]>;
  corpus: Observable<any[]>;
  annotators: any[] = [];
  admin: any[] = [];
  isConnected = false;

  constructor(
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private ps: ProjectService
  ) { }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.sub = this.activeRouter.params.subscribe(params => {
      this.ps.getProject(params.id).then(doc => {
        this.currentProject = doc.data();
        this.corpus = this.ps.getCorpus(this.currentProject.id);

        if (this.isConnected) {
          this.users = this.ps.getUsers();
          this.getAnnotatorEmail();
          this.getAdminEmail();
        }
      });
    });
    this.isDataLoaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAnnotatorEmail() {
    this.annotators = [];
    this.currentProject.annotators.forEach((uid, i) => {
      this.users.forEach(x => {
        x.forEach((u, j) => {
          if (u.uid === uid) {
            this.annotators.push({ email: u.email, uid: u.uid });
          }
        });
      });
    });
  }

  getAdminEmail() {
    this.admin = [];
    this.currentProject.admin.forEach((uid, i) => {
      this.users.forEach(x => {
        x.forEach((u, j) => {
          if (u.uid === uid) {
            this.admin.push({ email: u.email, uid: u.uid });
          }
        });
      });
    });
  }



  // Verifie si l'utilisateur connecte est un admin
  isAdmin(): boolean {
    let a = false;
    this.admin.forEach((user, i) => {
      if (user.uid === this.authService.getUser().uid) {
        a = true;
      }
    });
    return a;
  }

  // Sauvegarde les modifications apportées au projet.
  saveProjectModification() {
    if (
      this.currentProject.title != null &&
      this.currentProject.title !== '' &&
      this.currentProject.description != null &&
      this.currentProject.description !== ''
    ) {
      this.isProjectModified = false;
      this.ps.saveProject(this.currentProject);

      this.alertDialogBox('Modification sauvegardé');
    }
  }


  // Vérifie qu'un event n'a pas déjà le même nom
  isEventExist(data: Event): boolean {
    let exist = false;
    this.currentProject.events.forEach(event => {
      if (event.name === data.name) {
        exist = true;
      }
    });

    return exist;
  }

  // Vérifie qu'un event n'a pas déjà la même couleur
  eventColorAlreadyUsed(data: Event): boolean {
    let exist = false;
    this.currentProject.events.forEach(event => {
      if (event.bgColor === data.bgColor) {
        exist = true;
      }
    });

    return exist;
  }

  mapValidResultToEvent(result: Event): Event {
    return {
      name: result.name,
      type: result.type,
      labels: result.labels[0].split(','),
      attributes: result.attributes[0].split(','),
      bgColor: result.bgColor,
      arcs: [],
      borderColor: 'darken',
      children: [],
      unused: false
    };
  }

  // Permets de déterminer si la couleur sélectionne par l'utilisateur est une couleur foncée ou pas
  choisirCouleurDeTexte(backgroundColor: string): boolean {
    if (darkColors.includes(backgroundColor)) {
      return true;  // Couleur du texte sera blanc
    }
    return false; // Couleur du texte sera noir
  }


  /*
  Permet de savoir s'il y a eu des modifications(Ajouts/Supressions) non sauvgarde
  au elements tel que Entities/Relation/Attributs du projet
  */
  verificationEtatDuDocument(): boolean {
    if (this.isProjectModified === true) {
      // tslint:disable-next-line: max-line-length
      this.alertDialogBox('Vous avez fait des modifications au projet. Vous devez sauvegarder les modifications afin de pouvoir accéder au corpus sélectionne');
      return false;
    } else {

      const cpenl = this.currentProject.entities.length;        // Nombre d'elements de type Entites associe au project
      const cpevl = this.currentProject.events.length;          // Nombre d'elements de type Events associe au project
      const cprel = this.currentProject.relations.length;       // Nombre d'elements de type Relations associe au project
      const cpatl = this.currentProject.attributes.length;      // Nombre d'elements de type Attributes associe au project

      // Verifier si le projet contient au moins un attributes, entities, relations ou events afin de pouvoir faire des annotations
      if (cpenl === 0 && cpevl === 0 && cprel === 0 && cpatl === 0) {
        // tslint:disable-next-line: max-line-length
        this.alertDialogBox('Vous ne pouvez pas annoter si vous n\'avez pas au moins un (Entities/Relation/Events/Attributs) associe au projet');
        return false; // L'utilsateur ne pourra pas acceder au corpus avant d'ajouter un element
      } else {
        return true;  // L'utilisateur pourra acceder au corpus
      }
    }

  }


  // Dirige l'utilisateur au document/corpus selectionne apres avoir valide l'etat du document
  documentSelected(doc: any) {
    if (this.verificationEtatDuDocument()) {
      doc.projectTitle = this.currentProject.title;
      this.router.navigate(['/annotation', doc]);
    }
  }


  // Methode utilise pour afficher des messages d'avertissement
  alertDialogBox(texte: string): void {
    const dialogRef = this.dialog.open(AlertDialogBoxComponent, {
      width: '250px',
      data: {
        text: texte,
        response: undefined
      },
    });
  }





  // Supprime un texte
  deleteCorpus(corpus: any) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Corpus',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.ps.deleteCorpus(corpus.id, corpus.title);
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter un corpus
  addCorpusDialogBox() {
    const dialogRef = this.dialog.open(AddCorpusComponent, {
      width: '250px',
      data: { corpusTitle: undefined, corpusFile: undefined },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (
          result.corpusTitle !== undefined &&
          result.corpusFile !== undefined
        ) {
          // est-ce qu'il y a une validation ici a faire? (titre du fichier déjà existant?)
          this.ps.addCorpus(result, this.currentProject.id);
        }
      }
    });
  }


  // ouvre la boîte de dialogue pour ajouter un annotateur
  addAnnotatorDialogBox() {
    const dialogRef = this.dialog.open(AddAnnotatorComponent, {
      width: '600px',
      height: '600px',
      data: { UserId: undefined },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addAnnotatorAfterClosedHandler(result);
    });
  }

  addAnnotatorAfterClosedHandler(result: any) {
    let annotatorExists = false;
    if (result !== undefined) {
      this.currentProject.annotators.forEach(item => {
        if (item === result.uid) {
          annotatorExists = true;
        }
      });
      if (!annotatorExists) {
        this.currentProject.annotators.push(result.uid);
        this.annotators.push({ uid: result.uid, email: result.email });
      } else {
        this.alertDialogBox('This annotator already exists');
      }
    }
  }

  // Supprime l'annotateur spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAnnotator(uid: string) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Annotator',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.annotators.forEach((item, index) => {
          if (item === uid) {
            this.currentProject.annotators.splice(index, 1);
          }
        });
        this.annotators.forEach((item, index) => {
          if (item.uid === uid) {
            this.annotators.splice(index, 1);
          }
        });
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter un administrateur
  addAdminDialogBox() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '600px',
      height: '600px',
      data: { UserId: undefined },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addAdminAfterClosedHandler(result);
    });
  }

  addAdminAfterClosedHandler(result: any) {
    let adminExists = false;
    if (result !== undefined) {
      this.currentProject.admin.forEach(item => {
        if (item === result.uid) {
          adminExists = true;
        }
      });
      if (!adminExists) {
        this.currentProject.admin.push(result.uid);
        this.admin.push({ uid: result.uid, email: result.email });
      } else {
        this.alertDialogBox('This admin already exists');
      }
    }
  }

  // Supprime l'admin spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAdmin(uid: string) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Administrator',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.admin.forEach((item, index) => {
          if (item === uid) {
            this.currentProject.admin.splice(index, 1);
          }
        });
        this.admin.forEach((item, index) => {
          if (item.uid === uid) {
            this.admin.splice(index, 1);
          }
        });
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter une catégorie
  addEntityDialogBox() {
    const dialogRef = this.dialog.open(AddEntityComponent, {
      data: {
        name: undefined,
        type: undefined,
        labels: [],
        bgColor: undefined
      },
    });

    dialogRef.afterClosed().subscribe((result: Entity) => {
      this.addEntitiesAfterClosedHandler(result);
    });
  }

  addEntitiesAfterClosedHandler(result: Entity) {
    let entityExists = false;
    if (result !== undefined) {
      if (
        result.name !== undefined &&
        result.bgColor !== undefined &&
        result.type !== undefined &&
        result.labels !== undefined
      ) {
        this.currentProject.entities.forEach(item => {
          if (item.name === result.name) {
            entityExists = true;
            if (item.bgColor === result.bgColor) {
              this.alertDialogBox('The entity already exists');
            } else {
              this.alertDialogBox('Replacing color');
              item.bgColor = result.bgColor;
            }
          } else if (item.bgColor === result.bgColor) {
            entityExists = true;
            this.alertDialogBox('The chosen color is already used');
          }
        });

        if (!entityExists) {
          result.labels = result.labels[0].split(',');
          this.currentProject.entities.push(result);
          this.isProjectModified = true;
        }
      }
    }
  }

  // Supprime la catégorie spécifiée dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteEntity(entityName: string) {
    this.isProjectModified = true;
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'entity',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.entities.forEach((item, index) => {
          if (item.name === entityName) {
            this.currentProject.entities.splice(index, 1);
          }
        });
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter un attribut
  addAttributesDialogBox() {
    const dialogRef = this.dialog.open(AddAttributeComponent, {
      width: '400px',
      data: {
        name: undefined,
        type: undefined,
        labels: [],
        unused: false,
        values: ''
      },
    });

    dialogRef.afterClosed().subscribe((result: Attribute) => {
      this.addAttributesAfterClosedHandler(result);
    });
  }

  addAttributesAfterClosedHandler(result: Attribute) {
    let attributeExists = false;
    if (result !== undefined) {
      if (result.name !== undefined && result.type !== undefined && result.labels !== undefined) {
        this.currentProject.attributes.forEach(item => {
          if (item.name === result.name) {
            attributeExists = true;
          }
        });
        if (!attributeExists) {
          result.labels = result.labels[0].split(',');
          this.currentProject.attributes.push(result);
          this.isProjectModified = true;
        } else {
          this.alertDialogBox('This attribute already exists');
        }
      }
    }
  }

  // Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAttribute(target: Attribute) {
    this.isProjectModified = true;
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Attribute',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.attributes.forEach((item, index) => {
          if (item.name === target.name) {
            this.currentProject.attributes.splice(index, 1);
          }
        });
      }
    });
  }


  // Boite de dialogue pour création de relation
  addRelationDialogBox() {
    const dialogRef = this.dialog.open(AddRelationComponent, {
      width: '400px',
      data: {
        type: undefined,
        labels: [],
        dashArray: '3,3',
        color: undefined,
        attributes: [],
        arcs: []
      },
    });

    dialogRef.afterClosed().subscribe((result: Relation) => {
      this.addRelation(result);
    });
  }
  // Ajouter la donnée dans la liste de relation
  public addRelation(data: Relation) {
    if (data.type !== undefined &&
      data.labels !== [] &&
      data.color !== undefined) {
      if (!this.isExist(data)) {
        if (!this.relationColorAlreadyUsed(data)) {
          this.currentProject.relations.push(data);
          this.isProjectModified = true;
        } else {
          this.alertDialogBox('The chosen color is already used');
        }
      } else {
        this.alertDialogBox('This relation already exists');
      }
    }
  }
  /**
   * Verifier si la relation existe dans la liste de relation
   * @param data la donnée à verifier
   * @returns true quand la donnée existe dans la liste
   *          false quand la donnée n'existe pas dans la liste
   */
  public isExist(data: Relation): boolean {
    let exist = false;
    this.currentProject.relations.forEach(relation => {
      if (relation.type === data.type) {
        exist = true;
      }
    });
    return exist;
  }

  /**
   * Vérifie qu'une relation n'a pas déjà la même couleur
   * @param data
   */
  relationColorAlreadyUsed(data: Relation): boolean {
    let exist = false;
    this.currentProject.relations.forEach(relation => {
      if (relation.color === data.color) {
        exist = true;
      }
    });

    return exist;
  }

  /**
   * Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
   *  @param target
   * */
  deleteRelation(target: Relation) {
    this.isProjectModified = true;
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Relation',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.relations.forEach((relation, index) => {
          if (relation.type === target.type) {
            this.currentProject.relations.splice(index, 1);
          }
        });
      }
    });
  }


  addEventDialogBox() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '400px',
      data: {
        name: undefined,
        type: undefined,
        etiquettes: [],
        attributes: [],
        color: undefined,
      },
    });

    dialogRef.afterClosed().subscribe((result: Event) => {
      this.addEventAfterClosedHandler(result);
    });
  }

  addEventAfterClosedHandler(result: Event) {
    if (result !== undefined) {
      if (result.name !== undefined &&
        result.type !== undefined &&
        result.labels !== [] &&
        result.attributes !== [] &&
        result.bgColor !== undefined) {

        if (!this.isEventExist(result)) {
          if (!this.eventColorAlreadyUsed(result)) {
            this.currentProject.events.push(this.mapValidResultToEvent(result));
            this.isProjectModified = true;
          } else {
            this.alertDialogBox('The chosen color is already used');
          }
        } else {
          this.alertDialogBox('This event already exists');
        }
      }
    }
  }


  // Supprime l'attribut spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteEvent(target: Event) {
    this.isProjectModified = true;
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'Event',
        response: undefined
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.currentProject.events.forEach((event, index) => {
          if (event.name === target.name) {
            this.currentProject.events.splice(index, 1);
          }
        });
      }
    });
  }
}