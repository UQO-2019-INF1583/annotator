import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user.model';
import { Project } from '../shared/project.model';
import { Doc } from '../shared/document.model';

// secret: structure de données utilisée pour représenter l'ensemble des projets
// et en particulier, association entre projetId et l'emplacement du fichier correspondant

@Injectable()
export class ProjectManagerService {

  constructor() {
  }

  // Initialise un projet: détermine son emplacement et son administrateur.
  // Retourne false si projectId existe déjà.
  creerProjet(projectId: string, title: string, admin: string): boolean {
    return false;
  }

  // Supprime un projet avec toutes les données
  // Retourne false si projectId n'existe pas.
  delProject(projectId: string): boolean {
    return false;
  }

  // Modifie le titre du projet.
  // Retourne false si projectId n'existe pas.
  modifyTitle(projetId: string, title: string): boolean {
    return false;
  }

  // Remplace l'administrateur du projet.
  // Retourne false si projectId ou adminId n'existe pas.
  modifyAdmin(projetId: string, adminId: string): boolean {
    return false;
  }

  // Produit une liste des ids de tous les projets.
  getAll(): string[] {
    return null;
  }

  // Ajoute un annotateur à un projet
  // Retourne false si projectId ou userId n'existe pas.
  addAnnotator(projectId: string, userId: string): boolean {
    return false;
  }

  // Supprime un annotateur d'un projet
  // Retourne false si projectId ou userId n'existe pas.
  delAnnotator(projectId: string, userId: string): boolean {
    return false;
  }

  // Produit une liste des ids de tous les annotateurs d'un projet.
  // Retourne false si projectId n'existe pas.
  getAnnotators(projetId: string): string[] | boolean {
    return false;
  }

  // Produit une liste des ids de tous les projets avec username comme annotateur.
  // Retourne false si username n'existe pas.
  getProjectsAnnotated(username: string): string[] | boolean {
    return false;
  }

  // Produit une liste des ids de tous les projets avec username comme administrateur.
  // Retourne false si username n'existe pas.
  getProjectsAdministrated(username: string): string[] | boolean {
    return false;
  }

  // Produit une liste des noms de tous les documents d'un projet.
  // Retourne false si projectId n'existe pas.
  getCorpus(projetId: string): string[] | boolean {
    return false;
  }

  // Ajoute un nouveau document à un projet à partir d'un fichier texte.
  // Retourne false si projectId n'existe pas ou documentPath n'est pas correct.
  addDocument(projectId: string, documentPath: string): boolean {
    return false;
  }

  // Retourne le document avec documentName
  // Retourne false si documentName n'existe pas .
  getDocument(documentName: string): Document | boolean {
    return false;
  }

  // Supprime un document d'un projet
  // Retourne false si projectId ou documentName n'existe pas .
  delDocument(projectId: string, documentName: string): boolean {
    return false;
  }

}
