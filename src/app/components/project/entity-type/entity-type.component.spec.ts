import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EntityTypeComponent } from "./entity-type.component";
import { entiteMock } from "./entity-type.mock-data";

/*
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [EntityTypeComponent]
    }).compileComponents();
  }));

  it("should create the Entity SubComponent", () => {
    const fixture = TestBed.createComponent(EntityTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /*
  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tutoriel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("tutoriel");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".content span").textContent).toContain(
      "tutoriel app is running!"
    );
  });
  
});

/*
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from "@angular/material";
import { projectMocks, MatDialogMock } from "./../project.component.mock";
import { entiteMock } from "./entity-type.mock-data";

import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../../../tools/security/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { ProjectComponent } from "./../project.component";
import { ProjectManagerService } from "../../../services/project/projectManager.service";
import { ProjectService } from "../../../services/project/project.service";
import { RouterTestingModule } from "@angular/router/testing";
import { YesNoDialogBoxComponent } from "./../yes-no-dialog-box/yes-no-dialog-box.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { Observable } from "rxjs/Observable";

describe("Projet", () => {
  let projectComponent: ProjectComponent;
  let projectFixture: ComponentFixture<ProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatSelectModule
      ],
      declarations: [ProjectComponent, YesNoDialogBoxComponent],
      providers: [
        { provide: AngularFirestore, useValue: projectMocks.angularFirestore },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectMocks.projectService },
        {
          provide: ProjectManagerService,
          useValue: projectMocks.projectManagerService
        },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [YesNoDialogBoxComponent]
        }
      })
      .compileComponents();

    projectFixture = TestBed.createComponent(ProjectComponent);
    projectFixture.detectChanges();
    projectComponent = projectFixture.componentInstance;
    //import db from '../../../../firestore-export.json';
    //const Projects = Object.values(db.Projects);
    //let project = Projects.find(p => p.title === "Test");
    //projectComponent.annotators = project.annotators;
    //projectComponent.admin = project.admin;  });
  });

  describe("Entities", () => {
    it("should add the entite to the current project's entities if provided { with a valid } result", () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it("should alert the user when trying to add an entities using an already used name", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      expect(window.alert).toHaveBeenCalledWith("The entity already exists");
    });

    it("should alert the user when trying to add an entities using an already used color", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(window.alert).toHaveBeenCalledWith(
        "The chosen color is already used"
      );
      expect(projectComponent.currentProject.entities).not.toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it("should alert the user when trying to add an entities using an already used name and change the color if it's different", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid2);
      expect(window.alert).toHaveBeenCalledWith("Replacing color");
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid2)
      );
    });

    it("should be able to delete an entity", () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
      projectComponent.deleteEntity(entiteMock.valid3.name);
      expect(projectComponent.currentProject.entities).not.toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });
  });
});

// Straight Jasmine testing without Angular's testing support
describe("ValueService", () => {
  let service: ValueService;
  beforeEach(() => {
    service = new ValueService();
  });

  it("#getValue should return real value", () => {
    expect(service.getValue()).toBe("real value");
  });

  it("#getObservableValue should return value from observable", (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe("observable value");
      done();
    });
  });

  it("#getPromiseValue should return value from a promise", (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe("promise value");
      done();
    });
  });
});
*/
