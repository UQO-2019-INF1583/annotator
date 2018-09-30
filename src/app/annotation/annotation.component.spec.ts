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

let AngularFirestoreStub : Partial<AngularFirestore>;
let AuthServiceStub : Partial<AuthService>;
let ActivatedRouteStub : Partial<ActivatedRoute>;
let RouterStub : Partial<Router>;
let ProjectServiceStub : Partial<ProjectService>;
let CategoryServiceStub : Partial<CategoryService>;



let debugElement: DebugElement;

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let debugComponent : DebugElement;
  let htmlComponent : HTMLElement;

  beforeEach(async(() => {
    
    AngularFirestoreStub = {
    };

    AuthServiceStub = {
    isConnected: function() {return true;},
    };

    ActivatedRouteStub = {
    };

    RouterStub = {
    };

    ProjectServiceStub = {
    };

    CategoryServiceStub = {
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
         {provide: CategoryService, useValue: CategoryServiceStub}]
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
    //expect(component).toBeTruthy();
  })
});
