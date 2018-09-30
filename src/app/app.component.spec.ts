import { TestBed, async,inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseApp, FirebaseAppConfig, AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared';
import {MatSnackBar} from '@angular/material'
import { MatMenuModule} from '@angular/material/menu';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from './shared/security/auth.service';
//private authService: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore

describe('AppComponent', () => {
  let debugElement: DebugElement;
  let authServ: AuthService;
  const AngularFirestoreStub = {
    collection: (someString) => {
    }
  };

  const AuthServiceStub = {
    collection: (some) => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    providers: [{provide: AngularFirestore, useValue: AngularFirestoreStub},{provide: AuthService, useValue: AuthServiceStub}],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule, 
        FormsModule, 
        ReactiveFormsModule,
        MatMenuModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Annotateur'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Annotateur');
  });

/*  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    authServ = debugElement.injector.get(AuthService);
    authServ.isConnected = () =>{ return true};
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('UQO Annotator');
  }));*/

});
