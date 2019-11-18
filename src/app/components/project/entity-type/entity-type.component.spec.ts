/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import { TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EntityTypeComponent, EntityData } from "./entity-type.component";
import { EntityTypesMock } from "./entity-type.mock";
import { Project, ProjectUtils } from "../../../models/project.model";
import { Entity } from "../../../models/entity.model";

import { AuthService } from "../../../tools/security/auth.service";
import { ProjectService } from "../../../services/project/project.service";
import { AngularFirestore } from "@angular/fire/firestore";

import {
  projectMocks,
  relationMock,
  attributMock,
  eventMock,
  adminMock,
  annotatorMock,
  MatDialogMock
} from "./../project.component.mock";
import { Observable } from "rxjs";

/**************************************************************************************
 *    Mock Project Service :
 * ***********************************************************************************/
const projectServiceMock: Partial<ProjectService> = {
  getProject: (id: string) => {
    return new Promise(resolve => {
      resolve(EntityTypesMock.validProject);
    });
  },

  saveProject: () => {
    return new Promise(resolve => {
      resolve(EntityTypesMock.validProject);
    });
  }
};

/**************************************************************************************
 *    Entity Type Component Testing
 * ***********************************************************************************/
describe("EntityTypeComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule
      ],
      declarations: [EntityTypeComponent],
      providers: [
        { provide: AngularFirestore, useValue: projectMocks.angularFirestore },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectServiceMock }
      ]
    }).compileComponents();
  }));

  /**************************************************************************************
   *    Entity Component Creation Test
   *    - This test if the entity component has been created.
   * ***********************************************************************************/
  it("should create the Entity SubComponent", () => {
    const fixture = TestBed.createComponent(EntityTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /**************************************************************************************
   *    Entity Component Project Load Test
   *    - This test checks if the project is correctly assignable
   * ***********************************************************************************/
  it("should load a project", () => {
    const entityComponentTesting = TestBed.createComponent(EntityTypeComponent);

    entityComponentTesting.componentInstance.project =
      EntityTypesMock.emptyProject;

    expect(entityComponentTesting.componentInstance.project).toBe(
      EntityTypesMock.emptyProject as Project
    );
  });

  /**************************************************************************************
   *    Create new Entity Test
   *    - This test checks if the create() methods adds a new Entity to mock-project
   * ***********************************************************************************/
  it("should add a new Entity", () => {
    // Load test project
    const entityComponentTesting = TestBed.createComponent(EntityTypeComponent);
    entityComponentTesting.componentInstance.project =
      EntityTypesMock.emptyProject;

    // create a duplicate
    let projects = EntityTypesMock.emptyProject;

    // set the newEntity values
    const newEntity = {
      name: "Test",
      type: "Test",
      labels: ["Test", "T"],
      bgColor: "#FE2E2E",
      borderColor: "darken",
      arcs: []
    } as Entity;
    entityComponentTesting.componentInstance.newEntity = newEntity;

    // use the create method that adds the newEntity to the project
    entityComponentTesting.componentInstance.create();

    projects.entities.push(newEntity);
    expect(entityComponentTesting.componentInstance.project).toBe(projects);
  });

  /**************************************************************************************
   *    Remove Entity Test
   *    - This test checks if the remove() method removes the last element of mock-projectangular
   * ***********************************************************************************/
  it("should remove an Entity", () => {
    // Load test project
    const entityComponentTesting = TestBed.createComponent(EntityTypeComponent);

    // Set project
    entityComponentTesting.componentInstance.project =
      EntityTypesMock.validProject;

    // Remove the last entity using the remove() method
    entityComponentTesting.componentInstance.remove(
      EntityTypesMock.validProject.entities.length - 1
    );

    // Remove the last entity
    let validProject = EntityTypesMock.validProject;
    validProject.entities.splice(validProject.entities.length - 1, 1);

    expect(entityComponentTesting.componentInstance.project).toBe(
      validProject as Project
    );
  });

  /**************************************************************************************
   *    Add Label to Entity
   *    - This test checks if the addLabel() adds a new label to an entity
   * ***********************************************************************************/
  it("should add a Label to an Entity", async () => {
    // Load test project
    let entityComponentTesting = TestBed.createComponent(EntityTypeComponent);
    entityComponentTesting.componentInstance.project =
      EntityTypesMock.validProject;

    // Wait for the Component to be stable
    entityComponentTesting.whenStable().then(() => {
      // Use the EntityData structure to set the new label value
      let entityData = { label: "New Label" } as EntityData;

      // use the addLabel to add a label
      entityComponentTesting.componentInstance.addLabel(
        entityComponentTesting.componentInstance.project.entities[0],
        entityData
      );

      // Add the label to entity
      let validProject = EntityTypesMock.validProject;
      validProject.entities[0].labels.push(entityData.label);

      expect(entityComponentTesting.componentInstance.project).toBe(
        validProject
      );
    });
  });

  /**************************************************************************************
   *    Remove Label to Entity
   *    - This test checks if the removeLabel() method removes a label from an entity
   * ***********************************************************************************/
  it("should remove a Label to an Entity", async () => {
    // Load test project
    let entityComponentTesting = TestBed.createComponent(EntityTypeComponent);
    entityComponentTesting.componentInstance.project =
      EntityTypesMock.validProject;

    // Wait for the Component to be stable
    entityComponentTesting.whenStable().then(() => {
      let entity = EntityTypesMock.validProject.entities[0];

      // Remove the first label of the first entity using removeLabel()
      entityComponentTesting.componentInstance.removeLabel(
        entityComponentTesting.componentInstance.project.entities[0],
        0
      );

      // Remove the label of entity
      let validProject = EntityTypesMock.validProject;
      validProject.entities[0].labels.splice(0, 1);

      expect(entityComponentTesting.componentInstance.project).toBe(
        validProject
      );
    });
  });
});
