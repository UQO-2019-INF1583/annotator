import { NO_ERRORS_SCHEMA, DebugElement } from "@angular/core";
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { AuthService } from "../shared/security/auth.service";
import { LoginComponent } from "./login.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { By } from "@angular/platform-browser";

describe("LoginComponent", () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let router: Router;
  let authService: AuthService;
  let afs: AngularFirestore;
  let de: DebugElement;

  const testCred = {
    email: "test@gmail.com",
    password: "Test@1234"
  };
  const validTestCred = [
    {
      email: "hello@gmail.com",
      password: "Test@1234"
    },
    {
      email: "hello123@gmail.com",
      password: "Test@1234"
    }
  ];
  const invalidTestCred = [
    {
      email: "rainunivers",
      password: "Test@1234"
    },
    {
      email: "xyz@gmail.com",
      password: "Test@1234"
    },
    {
      email: "asdfasdfasdf@gmail.com",
      password: "Test@1234"
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy()
          }
        },
        {
          provide: AngularFireAuth,
          useValue: {
            navigate: jasmine.createSpy()
          }
        },
        {
          provide: AuthService,
          useValue: {
            signIn: jasmine.createSpy(),
            logout: jasmine.createSpy()
          }
        },
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpyObj("AngularFirestore", {
            collection: jasmine.createSpyObj({
              doc: jasmine.createSpyObj({
                set: jasmine.createSpy()
              })
            })
          })
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    afs = TestBed.get(AngularFirestore);

    fixture.detectChanges();
  });
  //component créé ?
  it("should create", () => {
    expect(comp).toBeTruthy();
  });
  //le bon titre d'interface
  it('should have H2 title tag "Login"', () => {
    expect(de.query(By.css("h2")).nativeElement.innerText).toBe("Login");
  });
  //presence du formulaire de connexion
  it("should have a form to allow the user to type in the necessary information", () => {
    expect(de.query(By.css("form"))).toBeTruthy();
  });
  //presence de 2 divs dans le form
  it("should verify that there are 2 divs IN the input form", () => {
    const divs = document.querySelectorAll("form  div").length;
    const condition = divs === 2;
    expect(condition).toBe(true);
  });
  //presence du bouton de connexion
  describe("Minimun one button to save user sign in should be one the page ", () => {
    it("should have a minimun of one button on the page  and it should be <Login>", () => {
      const buttons = fixture.debugElement.queryAll(By.css("button"));
      expect(buttons.length >= 1).toBeTruthy();
    });
    it('The page should contain one "Login" button', () => {
      const buttons = fixture.debugElement.queryAll(By.css("button"));
      const nativeButton: HTMLButtonElement = buttons[0].nativeElement;
      expect(nativeButton.textContent).toBe("Login");
    });
  });

  describe("signIn()", () => {
    it("should signin user", () => {
      authService.signIn = jasmine.createSpy().and.callFake(() => {});
      comp.userInfo = {
        email: testCred.email,
        password: testCred.password
      };

      comp.login();
      expect(authService.signIn).toHaveBeenCalledWith(
        testCred.email,
        testCred.password
      );
    });

    it("should throw error if signin fails", done => {
      authService.signIn = jasmine.createSpy().and.throwError("Sign in failed");
      try {
        comp.login();
      } catch (e) {
        done();
      }

      expect(authService.signIn).toHaveBeenCalledTimes(1);
    });
  });

  describe("Check for emails", function() {
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      comp = fixture.componentInstance;
    });

    validTestCred.forEach(valid => {
      it(`should not show error for Email - ${valid.email}`, <any>(
        fakeAsync(() => {
          const spy = jasmine.createSpy();
          spyOn(firebase, "auth").and.returnValue({
            createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(
              Promise.resolve({
                user: {
                  updateProfile: spy
                }
              })
            )
          } as any);
          setInputValue('input[name="email"]', valid.email);
          setInputValue('input[name="password"]', valid.password);
          fixture.debugElement
            .query(By.css("#btnSubmit"))
            .nativeElement.click();
          fixture.detectChanges();
          tick(20);
          const validationMessage = fixture.debugElement.query(
            By.css('input[name="email"]')
          ).nativeElement.validationMessage;
          expect(validationMessage).toEqual("");
        })
      ));
    });

    invalidTestCred.forEach(inVal => {
      it(`should show error for Email - ${inVal.email}`, <any>fakeAsync(() => {
        const spy = jasmine.createSpy();
        spyOn(firebase, "auth").and.returnValue({
          createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(
            Promise.resolve({
              user: {
                updateProfile: spy
              }
            })
          )
        } as any);
        setInputValue('input[name="email"]', inVal.email);
        setInputValue('input[name="password"]', inVal.password);
        fixture.debugElement.query(By.css("#btnSubmit")).nativeElement.click();
        fixture.detectChanges();
        tick(20);
        const validationMessage = fixture.debugElement.query(
          By.css('input[name="email"]')
        ).nativeElement.validationMessage;
        expect(validationMessage).not.toBe(null);
        // expect(comp.errorMessage).not.toBeNull();
      }));
    });

    // must be called from within fakeAsync due to use of tick()
    function setInputValue(selector: string, value: string) {
      fixture.detectChanges();
      tick();
      const input = fixture.debugElement.query(By.css(selector)).nativeElement;
      input.value = value;
      input.dispatchEvent(new Event("input"));
      tick();
    }
  });
});
