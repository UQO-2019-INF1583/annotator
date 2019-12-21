import {TestBed} from '@angular/core/testing';

import {AdminGuardService} from './admin-guard.service';
import {AnnotationService} from '../../annotation/annotation.service';
import {AuthService} from './auth.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';

describe('AdminGuardService', () => {
  const AngularFirestoreStub = {};
  const AngularFireAuthStub = {};
  const AuthServiceStub = {};
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AnnotationService,
      AdminGuardService,
      { provide: AuthService, useValue: AuthServiceStub },
      { provide: AngularFireAuth, useValue: AngularFireAuthStub },
      { provide: AngularFirestore, useValue: AngularFirestoreStub }
      ],
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule
    ]
  }));

  it('should be created', () => {
    const service: AdminGuardService = TestBed.get(AdminGuardService);
    expect(service).toBeTruthy();
  });
});
