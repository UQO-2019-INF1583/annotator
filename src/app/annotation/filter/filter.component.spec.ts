// Commande pour lancer les tests du composent
// ng test --include src/app/annotation/filter/filter.component.spec.ts

import { TestBed, async } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { MOCK_FILTER } from './filter.service.MOCKDATA';

//beforeEach() et afterEach() s'assurent que chaque test soit effectué avec un MOCK propre
beforeEach(() => {
    var filterMockData = MOCK_FILTER;
    document.body.insertAdjacentHTML('afterbegin', filterMockData);
})

afterEach(function () {
    document.body.removeChild(document.getElementById('filterMockData'));
});

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilterComponent
            ],
        }).compileComponents();
    }));

    /**
     * Ce test s'assure que le composent a été créé
     */
    it('Le composent devrait être créé', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    })

    /**
    * Ce test s'assure que FilterComponent ai le bon nombre d'éléments filtrables 
     */
    it('Le bon nombre d\'éléments filtrables devrait être identifié', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app.elements.length).toEqual(25);
    })

    /**
     * Ce test s'assure que FilterComponent ai le bon nombre d'highlights 
     */
    it('Le bon nombre d\'highlights devrait être identifié', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app.highlights[0].getElementsByTagName('rect').length).toEqual(25);
    })

    /**
    * Ce test s'assure que FilterComponent ai le bon nombre de couleurs
     */
    it('La fonction "highlightFilter" identifie le bon nombre de couleurs', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        app.highlightFilter();

        expect(app.highLightColors.length).toEqual(5);
    })

    /**
    * Ce test s'assure que la fonction "showFilter()" ai le bon nombre d'éléments filtrables dans le tableau de filtres
     */
    it('La fonction "showFilter()" identifie le bon nombre de type d\'éléments filtrables dans le tableau de filtres', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        app.showFilter();

        expect(app.filterElements.size).toEqual(5);
    })

    /**
     * Ce test s'assure que le tableau de filtres soit à jour à l'ajout d'une nouvelle annotation
     */
    it('Vérifie si le tableau de filtres est met à jour quand on ajoute une nouvelle annotation', async () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.debugElement.componentInstance;

        //Ajoute une nouvelle annotation
        document.body.insertAdjacentHTML('afterbegin', "<g id=\"tmpAnnotation\" class=\"span\"><rect></rect><text>Disease</text><></path></g>");

        app.showFilter();

        expect(app.filterElements.size).toEqual(6);

        //Retire l'annotation
        document.body.removeChild(document.getElementById('tmpAnnotation'));
    })
})
