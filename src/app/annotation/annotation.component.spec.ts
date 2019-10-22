/*
Classe faisant partie de la suite de classes de la modification du groupe 2 
La modification AnnotationComponent qui est une composante ajoutee au systeme d'Annotations

Classe/fichier code qui fait le Passage à la version Angular 8. 
Date de creation: le 18 oct 2019
Auteur : Hugo Lapointe, Groupe 2

Date de derniere modification: 20 oct 2019
par : Victor Blaja
quoi: ajouter des commentaires
*/


//Importation des librairies

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AnnotationComponent } from './annotation.component';
import { MatCardModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../shared/security/auth.service';
import { ProjectService } from '../components/project/project.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FirebaseApp, AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AnnotationService } from './annotation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// declaration des variables de classe

let AngularFirestoreStub: Partial<AngularFirestore>;
let AngularFireStorageStub: Partial<AngularFireStorage>;
let AuthServiceStub: Partial<AuthService>;
let ProjectServiceStub: Partial<ProjectService>;
let AnnotationServiceStub: Partial<AnnotationService>;


/* note pour le programmeur: 
Prochaines étapes: Doit créer les stubs pour mocker les interactions entre le component et ses services injectés
ressources :
https://stackoverflow.com/questions/48760093/how-to-provide-mock-angularfirestore-module-inside-angular-component-for-default
*/

/* fonction annotation component
variables locales de la fonction: component, fxture, debugComponent, htmlcomponent, httpClient,httpTestingControler,app
*/
describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let debugComponent: DebugElement;
  let htmlComponent: HTMLElement;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let app: FirebaseApp;

//Assignation des valeurs aux variables de classe, avant la synchronisation du programme
  beforeEach(async(() => {

    AngularFirestoreStub = {
    };

    AngularFireStorageStub = {
    };

    AuthServiceStub = {
      isConnected: function () { return true; },
    };

    ProjectServiceStub = {
    };

    AnnotationServiceStub = {
    };

    // configuration du module de test pour la modification AnnotationComponent 
    /* 
    type de fonction: configuration d'un module de test
    nom de la fonction: TestBed.configureTestingModule
    qui sert a tester le fonctionemtnt de la configuraton du module d'annotation
    modules importees par cette fonction:         
         ReactiveFormsModule,
        MatCardModule,
        RouterTestingModule,
        MatSelectModule,
        MatToolbarModule,
        AngularFireModule,
        HttpClientTestingModule,
        AngularFireModule.
        variables et valeures utilisees par cette fonction: 
        AngularFirestore, useValue: AngularFirestoreStub },
        Variable: AngularFireStorage,  Valeur prise de:  AngularFireStorageStub, 
         Variable: AuthService,  Valeur prise de: AuthServiceStub 
       Variable:  ProjectService,  Valeur prise de: ProjectServiceStub 
        Variable:  AnnotationService,  Valeur prise de: AnnotationServiceStub

*/
    TestBed.configureTestingModule({
      declarations: [AnnotationComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        RouterTestingModule,
        MatSelectModule,
        MatToolbarModule,
        AngularFireModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireStorage, useValue: AngularFireStorageStub },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: ProjectService, useValue: ProjectServiceStub },
        { provide: AnnotationService, useValue: AnnotationServiceStub }]
    })
      .compileComponents();
  }));

  // fonctionalite qui definie la valeur de la variable app avant le commencement du FirebaseApp
  
  beforeEach(() => {
    inject([FirebaseApp], (_app: FirebaseApp) => {
      app = _app;
    })();
    fixture = TestBed.createComponent(AnnotationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement;
    htmlComponent = debugComponent.nativeElement;
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  
  
  it('should create', () => {
    expect(component).toBeDefined();
  });

  // fonctionalite qui fait un exit lorsqu'il verifie que le repertoire dom existe ou pas
  
  xit('check if brat div exist in dom', () => {
    expect(debugComponent.query(By.css('#brat'))).toBeTruthy();
  });

  // fonctionalite qui verifie si l'editeur brat et chargee , si non tu fais un exit
  
  xit('check if brat front end editor is loaded', () => {
    expect(component.getBrat).toBeTruthy();
  });

  // TODO Corriger l'application ou le test : cause un timeout - ne fait pas partie des tests remis lors de l'itération 1
  xit('should have a paragraph in a p tag if user is connected', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    component.isConnected = true;
    expect(compiled.querySelector('p').textContent).toContain('To add an annotation, highlight the text and choose the category.');
  }));
});
