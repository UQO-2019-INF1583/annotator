import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

// secret: structure de données utilisée pour représenter l'ensemble des projets
// et en particulier, association entre projetId et l'emplacement du fichier correspondant

@Injectable()
export class projectManagerService {

  constructor() {
  }

  // Initialise un projet: détermine son emplacement et son administrateur.
  // Retourne false si projectId déjà existe.
  creerProjet(projectId: string, title: string, admin: string) : boolean {
  }

  // Supprime un projet.
  // Retourne false si projectId n'existe pas.
  delProject(projectId: string) : boolean {
  }

  // Modifie le titre du projet.
  // Retourne false si projectId n'existe pas.
  modifyTitle(projetId: string, title: string) : boolean {
  }

  // Remplace l'administrateur du projet.
  // Retourne false si projectId n'existe pas.
  modifyAdmin(projetId: string, admin: string) : boolean {
  }

  // Produit une liste de tous les projets.
  getAll() {
  }

}