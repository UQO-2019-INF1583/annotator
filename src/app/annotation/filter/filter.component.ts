import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [FilterService]
})
export class FilterComponent implements OnInit {
  constructor(private fs: FilterService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showFilter();
    }, 3000);
    setTimeout(() => {
      this.highlightFilter();
    }, 3000);
  }

  elements: HTMLCollectionOf<HTMLElement> = this.fs.getFiltrableElements();
  highlights: HTMLCollectionOf<HTMLElement> = this.fs.getHighlights();
  highLightColors: string[] = [];
  filterElements = new Set();

  /**
   * Cette fonction ajoute à "filterElements" les éléments qui peuvent être filtrer dans la page (e.g. Les entités, les événements, etc.)
   */
  showFilter(): void {
    for (var i = 0; i < this.elements.length; i++) {
      this.filterElements.add(this.elements[i].children[1].innerHTML);
    }
  }

  /**
   * Cette fonction ajoute l'attribut "backgroud-color" avec la coleur appropriée aux éléments dans la liste de filtrage
   */
  highlightFilter(): void {
    for (var i = 0; i < this.elements.length; i++) {
      if (!this.highLightColors.includes(this.highlights[0].getElementsByTagName('rect')[i].getAttribute('fill'))) {
        this.highLightColors.push(this.highlights[0].getElementsByTagName('rect')[i].getAttribute('fill'))
      }
    }

    var liToHighlight: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('filterOption') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < liToHighlight.length; i++) {
      liToHighlight[i].setAttribute('style', 'background-color:' + this.highLightColors[i]);
    }
  }

  /**
   * Cette fonction détermine si un groupe d'éléments doit être affiché ou masqué
   * 
   * @param event -Le "checkbox" qui a été selectionné ou désélectionner
   * @param name - Le nom du groupe d'éléments à afficher ou masquer
   */
  checkBoxEventChecker(event, name): void {
    if (event.target.checked) {
      this.showElements(name);
    } else {
      this.hideElements(name);
    }
  }

  /**
   * Cette fonction affiche les éléments d'un groupe d'éléments
   * 
   * @param name - Le nom du groupe d'éléments à afficher
   */
  showElements(name): void {
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].textContent == name) {
        this.elements[i].style.display = 'Block';
        this.highlights[0].getElementsByTagName('rect')[i].style.display = 'Block'
      }
    }
  }

  /**
   * Cette fonction masque les éléments d'un groupe d'éléments
   * 
   * @param name - Le nom du groupe d'éléments à masquer 
   */
  hideElements(name): void {
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].textContent == name) {
        this.elements[i].style.display = 'None';
        this.highlights[0].getElementsByTagName('rect')[i].style.display = 'None'
      }
    }

  }
}