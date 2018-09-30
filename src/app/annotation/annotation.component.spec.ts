import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

const AngularFirestoreStub = {
    collection: (someString) => {
    }
  };

  const AuthServiceStub = {
    collection: (some) => {}
  };

  const ActivatedRouteStub = {
    collection: (some) => {}
  };

  const RouterStub = {
    collection: (some) => {}
  }

  const ProjectServiceStub = {
    collection: (some) => {}
  }

  const CategoryServiceStub = {
    collection: (some) => {}
  }

  let debugElement: DebugElement;
  let authServ: AuthService;

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationComponent ],
      imports: [
        RouterModule,
        MatCardModule,
        MatToolbarModule
      ],
      providers: [{provide: AngularFirestore, useValue: AngularFirestoreStub},
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
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authServ = debugElement.injector.get(AuthService);
    authServ.isConnected = () => { return true };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {

  });
});
