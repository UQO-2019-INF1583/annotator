import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Annotation } from '../shared/annotation.model.ts';

// secret de la classe: la manière dont les annotations sont représentées dans le fichier .xmi

@Injectable()
export class AnnotationService {
  static currentDoc: Document = null;

  constructor() { }

  // Ajoute une nouvelle annotation.
  // Retourne false si une erreur est détectée.
  addAnnotation(begin: number, end: number, cat: string): boolean {
  }

  // Supprime une annotation.
  // Retourne false si une erreur est détectée.
  delAnnotation(begin: number, end: number, cat: string): boolean {
  }

  // Retourne toutes les annotations du document.
  // Retourne false si une erreur est détectée.
  getAnnotations(): Annotation[] | boolean {
  }

  // Retourne les annotations de la catégorie donnée dans le document.
  // Retourne false si une erreur est détectée.
  getAnnotations(cat: string): Annotation[] | boolean {
  }

  // Ajoute une catégorie.
  // Retourne false si cette catégorie existe déjà.
  addCategory(cat: string): boolean {
  }

  // Supprime une catégorie.
  // Retourne false si une erreur est détectée.
  delCategory(cat: string): boolean {
  }

  // Remplace une catégorie.
  // Retourne false si une erreur est détectée.
  replaceCategory(oldCat: string, newCat: string): boolean {
  }

  // Vérifie si une catégorie existe.
  checkCategory(cat: string): boolean {
  }

  // Associe une couleur avec une catégorie.
  // Retourne false si une erreur est détectée.
  colorCategory(cat: string, color: string): boolean {
  }

  // Retourne les catégories du projet.
  // Retourne false si une erreur est détectée.
  getCategories(cat: string): string[] | boolean {
  }

  // Retourne la couleur d'une catégorie.
  // Retourne false si une erreur est détectée.
  getCategoryColor(cat: string): string | boolean {
  }

}
