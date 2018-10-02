import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Annotation } from '../shared/annotation.model';

// secret de la classe: la manière dont les annotations sont représentées dans le fichier .xmi

@Injectable()
export class AnnotationService {
  static currentDoc: Document = null;

  constructor() {}

  // Ajoute une nouvelle annotation.
  // Retourne false si une erreur est détectée.
  addAnnotation(begin: number, end: number, cat: string): boolean {
    return false;
  }

  // Supprime une annotation.
  // Retourne false si une erreur est détectée.
  delAnnotation(begin: number, end: number, cat: string): boolean {
    return false;
  }

  // Retourne toutes les annotations du document.
  // Retourne false si une erreur est détectée.
  getAllAnnotations(): Annotation[] | boolean {
    return false;
  }

  // Retourne les annotations de la catégorie donnée dans le document.
  // Retourne false si une erreur est détectée.
  getAnnotations(cat: string): Annotation[] | boolean {
    return false;
  }

  // Ajoute une catégorie.
  // Retourne false si cette catégorie existe déjà.
  addCategory(cat: string): boolean {
    return false;
  }

  // Supprime une catégorie.
  // Retourne false si une erreur est détectée.
  delCategory(cat: string): boolean {
    return false;
  }

  // Remplace une catégorie.
  // Retourne false si une erreur est détectée.
  replaceCategory(oldCat: string, newCat: string): boolean {
    return false;
  }

  // Vérifie si une catégorie existe.
  checkCategory(cat: string): boolean {
    return false;
  }

  // Associe une couleur avec une catégorie.
  // Retourne false si une erreur est détectée.
  colorCategory(cat: string, color: string): boolean {
    return false;
  }

  // Retourne les catégories du projet.
  // Retourne false si une erreur est détectée.
  getCategories(cat: string): string[] | boolean {
    return false;
  }

  // Retourne la couleur d'une catégorie.
  // Retourne false si une erreur est détectée.
  getCategoryColor(cat: string): string | boolean {
    return false;
  }
}
