import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { FilterService } from './filter.service';
import { MOCK_FILTER } from './filter.service.MOCKDATA'

// Initialise l'environnement de test d'Angular 
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

//beforeEach() et afterEach() s'assurent que chaque test soit effectué avec un MOCK propre
beforeEach(() => {
  var filterMockData = MOCK_FILTER;
  document.body.insertAdjacentHTML('afterbegin', filterMockData);
})

afterEach(function () {
  document.body.removeChild(document.getElementById('filterMockData'));
});

describe('FilterService', () => {
  const service: FilterService = TestBed.get(FilterService);
  it('Le service Filtre est créé', () => {
    expect(service).toBeTruthy();
  })

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie le bon 
 * nombre d'entités
 */
  it('Le nombre d\'éléments filtrables', () => {
    var num_elements = service.getFiltrableElements().length
    expect(num_elements).toBe(25);
  })

  /**
   * Ce test s'assure que le nombre d'éléments filtrables soit égal au nombre 
   * d'highlights
   */
  it('Le nombre d\'éléments filtrables = au nombre d\'highlights', () => {
    var num_elements = service.getFiltrableElements().length
    var num_highlights = service.getHighlights()[0].getElementsByTagName('rect').length
    expect(num_elements).toBe(num_highlights);
  })

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Symptom"
   */
  it('Le nombre d\'entités "Symptom"', () => {
    var num_elements = 0;
    var elements = service.getFiltrableElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() == "Symptom") {
        num_elements++;
      }
    }
    expect(num_elements).toBe(18);
  })

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "a"
 */
  it('Le nombre d\'entités "a"', () => {
    var num_elements = 0;
    var elements = service.getFiltrableElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() == "a") {
        num_elements++;
      }
    }
    expect(num_elements).toBe(2);
  })

  /**
 * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "t"
 */
  it('Le nombre d\'entités "t"', () => {
    var num_elements = 0;
    var elements = service.getFiltrableElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() == "t") {
        num_elements++;
      }
    }
    expect(num_elements).toBe(3);
  })

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Medication"
   */
  it('Le nombre d\'entités "Medication"', () => {
    var num_elements = 0;
    var elements = service.getFiltrableElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() == "Medication") {
        num_elements++;
      }
    }
    expect(num_elements).toBe(1);
  })

  /**
   * Ce test s'assure que la fonction getFiltrableElements() identifie tous les "Titre"
   */
  it('Le nombre d\'entités "Titre"', () => {
    var num_elements = 0;
    var elements = service.getFiltrableElements();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() == "Titre") {
        num_elements++;
      }
    }
    expect(num_elements).toBe(1);
  })
})