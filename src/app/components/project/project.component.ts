import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectManagerService } from 'app/adm/index';
import { UserManagerService } from 'app/adm/index';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  Uprojet: any = {};
  Cprojet: any = {};
  Tprojet: any = {};
  Cuprojet;
  Admprojet;

  constructor(public dialog: MatDialog,
              private projects: ProjectManagerService,
              private user: UserManagerService) {
      this.load();
      this.Cuprojet = this.projects.current().titreProjet;

      if (localStorage.getItem("currentUser") != null) {
        if(this.isAdmin(this.user.his().displayName))
          this.Admprojet = "Vous";
          else this.Admprojet = this.projects.current().admin;
        }else {this.Admprojet = this.projects.current().admin};

  }

  ngOnInit() {
    this.projects.updateId();
  }

  // Uprojet la liste des annotateurs du projet courant
  // Cprojet la liste de corpus du projet courant
  // Tprojet la liste de categories du projet courant
  load() {
    this.Uprojet = this.projects.getAnnotator();
    this.Cprojet = this.projects.getCorpus();
    this.Tprojet = this.projects.getCategories();
  }

  isAdmin(user: string){
    if (localStorage.getItem("currentUser") != null) {
      return this.projects.isAdmin(this.user.his().displayName);
    }else{return false;}
  }
  //verifie si l'utilisateur actuel est l'administrateur.  Prend "item" en parametre
  //il s'agit de l'item cree par la boucle ngFor sur le modele dans le document html.
  //Cette maniere de faire n'est pas du tout recommandee, mais je n'ai pas reussi a
  //atteindre les elements internes de la collection d'une maniere plus directe.

}