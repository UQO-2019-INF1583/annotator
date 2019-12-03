import { NO_ERRORS_SCHEMA, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/security/auth.service";
import { ProjectManagerComponent } from "./projectManager.component";
import { AngularFireAuth } from "@angular/fire/auth";

describe("ProjectManagerComponent", () => {
  let comp: ProjectManagerComponent;
  let fixture: ComponentFixture<ProjectManagerComponent>;

  let router: Router;
  let authService: AuthService;
  let afs: AngularFirestore;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerComponent],
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
    fixture = TestBed.createComponent(ProjectManagerComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    afs = TestBed.get(AngularFirestore);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(comp).toBeTruthy();
  });

  describe("Check list annotator/admin", function() {});
});
