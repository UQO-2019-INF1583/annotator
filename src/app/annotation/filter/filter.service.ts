import { Injectable, Inject } from '@angular/core';
//Représente le DOM
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {
  }

  /**
   * Cette fonction retourne les éléments filtrable
   */
  getFiltrableElements(): HTMLCollectionOf<HTMLElement> {
    return this.document.getElementsByClassName('span') as HTMLCollectionOf<HTMLElement>;
  }

  /**
   * Cette fonction retourne les "highlights" des éléments filtrable
   */
  getHighlights(): HTMLCollectionOf<HTMLElement> {
    return this.document.getElementsByClassName('highlight') as HTMLCollectionOf<HTMLElement>;
  }
}

