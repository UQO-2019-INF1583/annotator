import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatMenuModule} from '@angular/material/menu';
import { AnnotationComponent } from './annotation.component';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material'
import { RouterModule, Routes } from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../shared/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../components/project/project.service';
import { CategoryService } from './category.service';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import {Project} from '../shared/project.model';
import {Doc} from '../shared/document.model';
import { Category } from '../shared/category.model';



let AngularFirestoreStub : Partial<AngularFirestore>;
let AuthServiceStub : Partial<AuthService>;
let ActivatedRouteStub : Partial<ActivatedRoute>;
let RouterStub : Partial<Router>;
let ProjectServiceStub : Partial<ProjectService>;
let CategoryServiceStub : Partial<CategoryService>;


let debugElement: DebugElement;

/*
Prochaines étapes: Doit créer les stubs pour mocker les interactions entre le component et ses services injectés
ressources : 
https://stackoverflow.com/questions/48760093/how-to-provide-mock-angularfirestore-module-inside-angular-component-for-default


*/

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let debugComponent : DebugElement;
  let htmlComponent : HTMLElement;
  const fauxService = jasmine.createSpyObj('CategoryService', ['getCategories'])
  
  beforeEach(async(() => {
   

   /* AngularFirestoreStub = {
      collection: (somestring) => {return collection: (path) => {
        return {get: ()}
      }}  
    };
*/
    AuthServiceStub = {
    isConnected: function() {return true;},
    };

    ActivatedRouteStub = {
      params: Observable.of({id:"1234", title:"1234", projectId: "1234", projectTitle: "1234"}),
    };

    RouterStub = {
    };

    ProjectServiceStub = {
    };

    CategoryServiceStub = {
      getCategories: function(projectId){return Observable.of([])},
      
    };
    
    TestBed.configureTestingModule({
      declarations: [ AnnotationComponent ],
      imports: [
        RouterModule,
        MatCardModule,
        MatToolbarModule
      ],
      providers: [AnnotationComponent,{provide: AngularFirestore, useValue: AngularFirestoreStub},
         {provide: AuthService, useValue: AuthServiceStub},
         {provide: ActivatedRoute, useValue:ActivatedRouteStub},
         {provide: Router, useValue: RouterStub},
         {provide: ProjectService, useValue: ProjectServiceStub},
         {provide: CategoryService, useValue: fauxService}]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationComponent);
    //fixture.detectChanges();
    component = fixture.componentInstance;
    debugComponent = fixture.debugElement;
    htmlComponent = debugComponent.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
//"brat-frontend-editor"
  it('check if brat div exist in dom', () => {
    expect(debugComponent.query(By.css("#brat"))).toBeTruthy();
  });

  it('check if brat front end editor is loaded into dom', ()=> {
    fixture.detectChanges();
    component.
    //expect(component).toBeTruthy();
  })
});
