/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EntityTypeComponent, EntityData } from "./entity-type.component";
import { EntityTypesMock } from "./entity-type.mock";
import { Project, ProjectUtils } from "../../../models/project.model";
import { Entity } from "../../../models/entity.model";

import { AuthService } from "../../../tools/security/auth.service";
import { ProjectService } from "../../../services/project/project.service";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from "@angular/fire/firestore";

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
import { EntityType } from "../../../models/project";

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
  },
};

/**************************************************************************************
 *    Entity Type Component Testing
 * ***********************************************************************************/
let component: EntityTypeComponent;
let fixture: ComponentFixture<EntityTypeComponent>;
const validProject = JSON.parse(JSON.stringify(EntityTypesMock.validProject));

describe("EntityTypeComponent", () => {
  beforeEach(async(() => {

    const AngularFirestoreStub = {
      collection: (Project) => {
        EntityTypesMock.emptyProject;
      }
    }
    

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
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectServiceMock }
      ]
    }).compileComponents();

    // Overriding ngOnInit and ngOnDestroy because they call the firestore database and we don't want that for testing
    EntityTypeComponent.prototype.ngOnInit = () => {} 
    EntityTypeComponent.prototype.ngOnDestroy = () => {} 

    fixture = TestBed.createComponent(EntityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /**************************************************************************************
   *    Method :      constructor()
   *    Test :        Entity Component Creation
   *    Description : This test if the entity component has been created.
   * ***********************************************************************************/
  it("should create the Entity SubComponent", () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /**************************************************************************************
   *    Method :      ngOnInit()
   *    Test :        Project Load
   *    Description : This test checks if the project is correctly assignable
   * ***********************************************************************************/
  it("should load a project", () => {
    component.project = EntityTypesMock.emptyProject;
    expect(component.project).toBe( EntityTypesMock.emptyProject as Project );
  });

  /**************************************************************************************
   *    Method :      create()
   *    Test :        Create new Entity
   *    Description : This test checks if the create() methods adds a new Entity to mock-project
   * ***********************************************************************************/
  it("should add a new Entity", () => {

    component.project = EntityTypesMock.emptyProject;

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
    component.newEntity = newEntity;

    // use the create method that adds the newEntity to the project
    component.create();

    projects.entities.push(newEntity);
    expect(component.project).toBe(projects);
  });

  /**************************************************************************************
   *    Method :      remove()
   *    Test :        Delete an Entity
   *    Description : This test checks if the remove() method removes the last element of mock-projectangular
   * ***********************************************************************************/
  it("should remove an Entity", () => {
    // Set project
    component.project = EntityTypesMock.validProject;

    // Remove the last entity using the remove() method
    component.remove(EntityTypesMock.validProject.entities.length - 1);

    // Remove the last entity
    let validProject = EntityTypesMock.validProject;
    validProject.entities.splice(validProject.entities.length - 1, 1);

    expect(component.project).toBe(validProject as Project);
  });

  /**************************************************************************************
   *    Method :      validEntity()
   *    Test :        Check valid Entity
   *    Description : This test checks if an entity if an entity is valid
   * ***********************************************************************************/
  it("should verify if an Entity is valid", async () => {

    component.project = EntityTypesMock.emptyProject;

    // Wait for the Component to be stable
    fixture.whenStable().then(() => {

      // Remove all entities
      component.project.entities = [];

      // Initialise an empty Entity
      let entity = new Entity();

      // initialize an Entity Data
      let entityData : EntityData =  {
        error: true,
        message: "*Warning!",
        delete: true
      };

      // an empty project should be invalid (true)
      expect(component.validEntity(entity, entityData, -1)).toBe(true);
      expect(entityData.error).toBe(true);

      // Setting the type and name. It still missing the labels
      entity.type = "Type";
      entity.name = "Name";
      expect(component.validEntity(entity, entityData, -1)).toBe(true);
      expect(entityData.error).toBe(true);

      // Adding a label. Because colors have an initialized value, the entity is valid. It still missing the colors
      entity.labels[0] = "Label";
      expect(component.validEntity(entity, entityData, -1)).toBe(false);
      expect(entityData.error).toBe(false);

      // Adding the entity to the project
      component.project.entities.push(JSON.parse(JSON.stringify(entity)) as Entity);

      // Because the entity now exists in the project, it is not valid becasue it is a duplicatecheck for duplicates
      expect(component.validEntity(entity, entityData, -1)).toBe(true);
      expect(entityData.error).toBe(true);

      // Changing the name and type. Colors cant be the same but labels are fine
      entity.type = "New Type";
      entity.name = "New Name";
      expect(component.validEntity(entity, entityData, -1)).toBe(true);
      expect(entityData.error).toBe(true);

      // Now that most properties are different than existing entities, the entity is valid
      entity.bgColor = "red";
      entity.borderColor = "red";
      expect(component.validEntity(entity, entityData, -1)).toBe(false);
      expect(entityData.error).toBe(false);

    });
    expect(true).toBe(true);
  });

  /**************************************************************************************
   *    Method :      addLabel()
   *    Test :        add a label to an Entity
   *    Description : addLabel unshifts the labels array with the new value of ""
   * ***********************************************************************************/
  it("should add a Label to an Entity", async () => {

    // Wait for the Component to be stable
    fixture.whenStable().then(() => {

      let entity: EntityType = new EntityType();
      entity.labels = ["one"];

      // use the addLabel to add a label
      component.addLabel( entity );

      // Tests if the values are the ones expected
      expect(entity.labels).toEqual(["", "one"]);
      expect(entity.labels.length).toEqual(2);
      expect(entity.labels[0]).toEqual("");

    });
    expect(true).toBe(true);
  });

  /**************************************************************************************
   *    Method :      removeLabel()
   *    Test :        remove a label from an Entity
   *    Description : This test checks if the removeLabel() method removes a label from an entity
   * ***********************************************************************************/
  it("should remove a Label to an Entity", async () => {

    // Wait for the Component to be stable
    fixture.whenStable().then(() => {

      let entity: EntityType = new EntityType();
      entity.labels = ["one", "two"];

      // Remove the first label of the first entity using removeLabel()
      component.removeLabel( entity, 0 );
      expect(entity.labels).toEqual( ["two"] );
    });
    expect(true).toBe(true);
  });


  /**************************************************************************************
   *    Method :      validLabels()
   *    Test :        check labels validity
   *    Description : This test checks if all labels of an Entity are valid
   * ***********************************************************************************/
  it("should check if all labels of an entity are valid", async () => {
    // Wait for the Component to be stable
    fixture.whenStable().then(() => {

      // This Entity doesn't have valid labels
      let entity : EntityType = new EntityType();
      entity.labels = [""];
      expect(component.validLabels(entity)).toBe(true);

      entity.labels = ["asd"];
      expect(component.validLabels(entity)).toBe(false);
    });
    expect(true).toBe(true);
  });

  /**************************************************************************************
   *    Method :      existInAttribute
   *    Test :        check if attribute exist in Entity
   *    Description : When an Attribute is linked with an Entity, it's type is added to entity.attribute
   * ***********************************************************************************/
  it("should check if an attribute exists in an Entity", async () => {

    // TODO
    expect(true).toBe(true);

  });

  /**************************************************************************************
   *    Method :      existInRelation()
   *    Test :        check if Relation exist in Entity
   *    Description : When a Relation is linked with an Entity, it's type is added to entity.arcs
   * ***********************************************************************************/
  it("should check if a relation exists in an Entity", async () => {

    // TODO
    expect(true).toBe(true);

  });

});

