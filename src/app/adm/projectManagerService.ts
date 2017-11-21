import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

// secret: structure de données utilisée pour représenter l'ensemble des projets
// et en particulier, association entre projetId et l'emplacement du fichier correspondant

@Injectable()
export class projectManagerService {

  constructor() {
  }

  // initialiser un projet: détermine son emplacement et son administrateur
  creerProjet(projectId: string, title: string, admin: string) {
  }

  // supprime un projet
  delProject(projectId: string){
  }

  // modifie le titre du projet
  modifyTitle(projetId: string, title: string){
  }

  // remplace l'administrateur du projet
  modifyAdmin(projetId: string, admin: string){
  }

  // produit une liste de tous les projets
  getAll() {
  }

}