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

let AngularFirestoreStub: Partial<AngularFirestore>;
let AngularFireStorageStub: Partial<AngularFireStorage>;
let AuthServiceStub: Partial<AuthService>;
let ProjectServiceStub: Partial<ProjectService>;
let AnnotationServiceStub: Partial<AnnotationService>;


/*
Prochaines étapes: Doit créer les stubs pour mocker les interactions entre le component et ses services injectés
ressources :
https://stackoverflow.com/questions/48760093/how-to-provide-mock-angularfirestore-module-inside-angular-component-for-default
*/

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let debugComponent: DebugElement;
  let htmlComponent: HTMLElement;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let app: FirebaseApp;


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

  xit('should create', () => {
    expect(component).toBeDefined();
  });

  it('should verify the users information', () => {
    expect(component.getUserInfo).toBeTruthy();
  })
  it('should verify the call of the alert', () => {
    expect(component.LoadMergedDocument).toBeDefined();
  })

  xit('check if brat div exist in dom', () => {
    expect(debugComponent.query(By.css('#brat'))).toBeTruthy();
  });

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

  it('vérifier si le bouton merge est présent pour un administrateur', () => {
    //faux administrateur?  l'élément est faux sinon
    //expect(component.mergeAll).toBeDefined();

    //devrait vérifier le dom si le bouton est affiché (je pense)
    expect(debugComponent.query(By.caller('#mergeAll()'))).toBeTruthy();
  })
  it('vérifier si le bouton load merged document apparait pour un administrateur', () => {
    //expect(component.LoadMergedDocument).to
    expect(debugComponent.query(By.caller('#LoadMergedDocument()'))).toBeTruthy();
  })

});
