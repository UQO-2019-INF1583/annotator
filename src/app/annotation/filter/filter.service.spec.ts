import {TestBed, getTestBed, inject} from '@angular/core/testing';
import { FilterService } from './filter.service';
import { MOCK_FILTER } from './filter.service.MOCKDATA';

describe('FilterService', () => {


// beforeEach() et afterEach() s'assurent que chaque test soit effectué avec un MOCK propre
  beforeEach(() => {
    // Initialise l'environnement de test d'Angular
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
    document.body.insertAdjacentHTML('afterbegin', MOCK_FILTER);
  });

  afterEach(function () {
    document.body.removeChild(document.getElementById('filterMockData'));
  });

  it('Le service Filtre est créé', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie le bon
 * nombre d'entités
 */
  it('Le nombre d\'éléments filtrables', inject([FilterService], (service: FilterService) => {
    const num_elements = service.getFiltrableElements().length;
    expect(num_elements).toBe(25);
  }));

  /**
   * Ce test s'assure que le nombre d'éléments filtrables soit égal au nombre
   * d'highlights
   */
  it('Le nombre d\'éléments filtrables = au nombre d\'highlights', inject([FilterService], (service: FilterService) => {
    const num_elements = service.getFiltrableElements().length;
    const num_highlights = service.getHighlights()[0].getElementsByTagName('rect').length;
    expect(num_elements).toBe(num_highlights);
  }));

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Symptom"
   */
  it('Le nombre d\'entités "Symptom"', inject([FilterService], (service: FilterService) => {
    let num_elements = 0;
    const elements = service.getFiltrableElements();

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === 'Symptom') {
        num_elements++;
      }
    }
    expect(num_elements).toBe(18);
  }));

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "a"
 */
  it('Le nombre d\'entités "a"', inject([FilterService], (service: FilterService) => {
    let num_elements = 0;
    const elements = service.getFiltrableElements();

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === 'a') {
        num_elements++;
      }
    }
    expect(num_elements).toBe(2);
  }));

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "t"
 */
  it('Le nombre d\'entités "t"', inject([FilterService], (service: FilterService) => {
    let num_elements = 0;
    const elements = service.getFiltrableElements();

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === 't') {
        num_elements++;
      }
    }
    expect(num_elements).toBe(3);
  }));

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Medication"
   */
  it('Le nombre d\'entités "Medication"', inject([FilterService], (service: FilterService) => {
    let num_elements = 0;
    const elements = service.getFiltrableElements();

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === 'Medication') {
        num_elements++;
      }
    }
    expect(num_elements).toBe(1);
  }));

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Titre"
   */
  it('Le nombre d\'entités "Titre"', inject([FilterService], (service: FilterService) => {
    let num_elements = 0;
    const elements = service.getFiltrableElements();

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === 'Titre') {
        num_elements++;
      }
    }
    expect(num_elements).toBe(1);
  }));
});
