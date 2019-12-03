/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Role, User } from '../../shared/user.model';
import { AuthService } from './auth.service';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { project } from '../../annotation/brat/brat-utils.mock';


describe('AuthService', () => {
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;
  const FireAuthMock = {
    auth: of(null),
    authState: of({
      id: 'user1',
      email: 'email@test.com',
      displayName: ' John foe',
      role: '2'
    })
  };
  const FirestoreMock = {
  };
  const NotificationMock = {
    info: jasmine.createSpy('info')
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };
  const sampleUser: User = {
    password: 'test',
    role: Role.Adm,
    uid: 'user1',
    email: 'user1@email.com',
    displayName: 'John Doe'
  };
  const StoreMock = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [AuthService],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AngularFirestore, useValue: FirestoreMock },
        { provide: AngularFireAuth, useValue: FireAuthMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthService);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'currentUser', { writable: true });
    this.currentUser.uid = of(null);
    fixture.detectChanges();
  });

  // Component should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return 2 if user is admin', () => {
    component.isAdmin(project.proj1);
    expect(component.isAdmin(project.proj1)).toEqual(false);
  });
  it('should return true is user is admin', () => {
    const user = sampleUser;
    user.role = Role.Adm;
    component.user = user;
    expect(component.isAdmin).toBe(true)
  });
  /* it('should return false if user is not admin', () => {
     component.isAdmin(project.proj1);
     expect(component.isAdmin(project.proj1)).toEqual(false);
   })*/
/*
});
*/
