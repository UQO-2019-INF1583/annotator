// @ts-ignore
import { LoginComponent } from "./login.component";

import { TestBed, inject, async } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

class MockAuthService {
  authenticated = false;
  isAuthenticated() {
    return this.authenticated;
  }
}
describe("test Auth service", () => {
  // données de test
  const test = [
    {
      email: "test@gmail.com",
      password: "Test@1234"
    },
    {
      email: "test2@gmail.com",
      password: "Test2@1234"
    },
    {
      email: "",
      password: ""
    }
  ];

  let service: AuthService = jasmine.createSpyObj("AuthService", [
    "signIn",
    "isConnected"
  ]);
  beforeEach(async(() => {
    // Créer un faux service avec un espion sur la méthode getHeros
    const fauxService = jasmine.createSpyObj("AuthService", [
      "signIn",
      "isConnected"
    ]);
    // Make the spy return a synchronous Observable with the test data
    //const getHerosSpy = fauxService.getHeros.and.returnValue( of(HEROS) );

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: fauxService }] // utiliser le faux service
    }).compileComponents();
  }));

  //test connexion avec bon user
  it("test login good user", () => {
    service = TestBed.get(AuthService);
    service.signIn(test[0].email, test[0].password);
    expect(service.isConnected()).toBeTruthy(true);
  });
  //test connexion avec utilisateur inexistant
  it("test login bad user", () => {
    service = TestBed.get(AuthService);
    service.signIn(test[1].email, test[1].password);
    expect(service.isConnected()).toBeTruthy(false);
  });
  //test connexion avec mauvais mot de passe
  it("test login bad user password", () => {
    service = TestBed.get(AuthService);
    service.signIn(test[0].email, test[1].password);
    expect(service.isConnected()).toBeTruthy(false);
  });
  //test de connexion avec des chaines vide
  it("test login parameter null", () => {
    service = TestBed.get(AuthService);
    service.signIn(test[2].email, test[2].password);
    expect(service.isConnected()).toBeTruthy(false);
  });
});

describe("Component: Authentication", () => {
  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  it("should return true from isAuthenticated when there is a token", () => {
    service.authenticated = false;
    expect(component.needsLogin()).toBeTruthy();
  });

  it("should return false from isAuthenticated when there is a token", () => {
    service.authenticated = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});
