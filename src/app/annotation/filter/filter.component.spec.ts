import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { FilterComponent } from './filter.component';
import { MOCK_FILTER } from './filter.service.MOCKDATA';

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

describe('FilterComponent', () => {
  let component: FilterComponent;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
  * Ce test s'assure que la fonction showFilter() identifie le bon
  * nombre d'éléments
  */
    it('Le nombre d\'éléments filtrables', () => {
        component.showFilter();
        var num_elements = component.filterElements.size;
        expect(num_elements).toBe(25);
    })

    /**
  * Ce test s'assure que la fonction highlightFilter() change les éléments de filtre de la bonne couleur
  */
    it('Tableau de couleurs des annotations = Tableau de couleurs des filtres', () => {
        component.highlightFilter();
        var liHighlighted: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('filterOption') as HTMLCollectionOf<HTMLElement>;
        for (var i = 0; i < liHighlighted.length; i++) {
            expect(liHighlighted[i].getAttribute('style')).toBe('background-color:' + this.highLightColors[i]);
        }
    })

    /**
  * Ce test s'assure que la fonction showElements change bien l'attribut 'Display' de ceux-ci
  */
    it('Attribut display des elements et des highlights = Block', () => {
        component.showElements("a");
        for (var i = 0; i < component.elements.length; i++) {
            if (component.elements[i].textContent == name) {
                expect(component.elements[i].style.display).toBe('Block');
                expect(component.highlights[0].getElementsByTagName('rect')[i].style.display).toBe('Block');
            }
        }
    })

    /**
  * Ce test s'assure que la fonction hideElements change bien l'attribut 'Display' de ceux-ci
  */
    it('Attribut display des elements et des highlights = None', () => {
        component.hideElements("a");
        for (var i = 0; i < component.elements.length; i++) {
            if (component.elements[i].textContent == name) {
                expect(component.elements[i].style.display).toBe('None');
                expect(component.highlights[0].getElementsByTagName('rect')[i].style.display).toBe('None');
            }
        }
    })
});
