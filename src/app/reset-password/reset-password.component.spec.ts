import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  // Réinitialiser un objet représentant des combinaisons valides d'entrées
  const validTestCred = {
    email: 'hello@gmail.com',
    password: 'Test@1234'
  };

  // Réinitialiser un objet représentant des combinaisons d'entrées non valides
  const invalidTestCred = {
    email: 'xyz@gmail.com',
    password: 'Test@1234'
  };

  // Fonction qui se déclenche avant tout test
  beforeEach(() => {
    const authServiceStub = {
      resetPassword: email => ({ then: () => ({ catch: () => ({}) }) })
    };
    // Déclaration des composants nécessaires
    // Déclaration des providers (les services responsables de l'authentification Firebase)

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpyObj('AngularFirestore', {
            collection: jasmine.createSpyObj({
              doc: jasmine.createSpyObj({
                set: jasmine.createSpy()
              })
            })
          })
        }
      ],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('emailSent defaults to: false', () => {
    expect(component.emailSent).toEqual(false);
  });
  describe('Reset check for emails', function () {
    it(`should not show error for Email - ${validTestCred.email}`, <any>(
      fakeAsync(() => {
        const spy = jasmine.createSpy();
        spyOn(firebase, 'auth').and.returnValue({
          createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(
            Promise.resolve({
              user: {
                updateProfile: spy
              }
            })
          )
        } as any);
      })
    ));

    it(`should show error for Email - ${invalidTestCred.email}`, <any>(
      fakeAsync(() => {
        const spy = jasmine.createSpy();
        spyOn(firebase, 'auth').and.returnValue({
          createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(
            Promise.resolve({
              user: {
                updateProfile: spy
              }
            })
          )
        } as any);
      })
    ));

    // doit être appelé depuis fakeAsync en raison de l'utilisation de tick ()
    function setInputValue(selector: string, value: string) {
      fixture.detectChanges();
    }
  });
});
