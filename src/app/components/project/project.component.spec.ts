import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from "@angular/material";
import {
  projectMocks,
  relation1,
  relation2,
  relation3,
  validAtt,
  validAttResult,
  validEntiteResult,
  validEntiteResult2,
  validEntiteResult3,
  validEntities2,
  validEntities3
} from "./project.component.mock";

import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../../shared/security/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { ProjectComponent } from "./project.component";
import { ProjectManagerService } from "../../adm";
import { ProjectService } from "./project.service";
import { Relation } from "../../shared/relation.model";
import { RouterTestingModule } from "@angular/router/testing";

// TODO: Replace fdescribe with describe once the iteration is done
fdescribe("Projet", () => {
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
        MatSelectModule
      ],
      declarations: [ProjectComponent],
      providers: [
        { provide: AngularFirestore, useValue: projectMocks.angularFirestore },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectMocks.projectService },
        {
          provide: ProjectManagerService,
          useValue: projectMocks.projectManagerService
        }
      ]
    }).compileComponents();

    projectFixture = TestBed.createComponent(ProjectComponent);
    projectFixture.detectChanges();
    projectComponent = projectFixture.componentInstance;
  });

  it("Should create component", () => {
    expect(projectComponent).toBeDefined();
  });

  describe("Entities", () => {
    it("should add the entite to the current project's entities if provided with a valid result", () => {
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult3);
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(validEntities3)
      );
    });

    it("should alert the user when trying to add an entities using an already used name", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult);
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult);
      expect(window.alert).toHaveBeenCalledWith("The category already exists");
    });

    it("should alert the user when trying to add an entities using an already used color", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult);
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult3);
      expect(window.alert).toHaveBeenCalledWith(
        "The chosen color is already used"
      );
      expect(projectComponent.currentProject.categories).not.toContain(
        jasmine.objectContaining(validEntities3)
      );
    });

    it("should alert the user when trying to add an entities using an already used name and change the color if it's different", () => {
      spyOn(window, "alert");
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult);
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult2);
      expect(window.alert).toHaveBeenCalledWith("Replacing color");
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(validEntities2)
      );
    });

    it("Should be able to delete an entity", () => {
      projectComponent.addEntitiesAfterClosedHandler(validEntiteResult3);
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(validEntities3)
      );
      projectComponent.deleteCategory(validEntities3.name);
      expect(projectComponent.currentProject.categories).not.toContain(
        jasmine.objectContaining(validEntities3)
      );
    });
  });

  describe("Attributs", () => {
    it("should add the attribute to the current project's attributes if provided with a valid result", () => {
      projectComponent.addAttributesAfterClosedHandler(validAttResult);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(validAtt)
      );
    });

    it("should alert the user when trying to add an entities using an already used name", () => {
      spyOn(window, "alert");
      projectComponent.addAttributesAfterClosedHandler(validAttResult);
      projectComponent.addAttributesAfterClosedHandler(validAttResult);
      expect(window.alert).toHaveBeenCalledWith(
        "This attribute already exists"
      );
    });

    it("Should be able to delete an attribut", () => {
      projectComponent.addAttributesAfterClosedHandler(validAttResult);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(validAtt)
      );
      projectComponent.deleteAttribute(validAtt);
      expect(projectComponent.currentProject.attributes).not.toContain(
        jasmine.objectContaining(validAtt)
      );
    });
  });

  describe("Relations", () => {
    it("affiche le message d'erreur quand on ajoute deux fois la meme relation", () => {
      spyOn(window, "alert");
      projectComponent.addRelation(relation1);
      projectComponent.addRelation(relation1);
      expect(window.alert).toHaveBeenCalledWith("This relation already exists");
    });

    it("verifier si la relation ajouter existe dans la liste", () => {
      projectComponent.addRelation(relation1);
      projectComponent.addRelation(relation2);
      projectComponent.addRelation(relation3);
      expect(projectComponent.currentProject.relations).toContain(relation2);
      expect(projectComponent.currentProject.relations).toContain(relation3);
    });

    it("verifier si la relation ajouter n'existe pas dans la liste", () => {
      projectComponent.addRelation(relation1);
      projectComponent.addRelation(relation3);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(
        relation2
      );
      // valider avec la fonction
      expect(projectComponent.isExist(relation2)).toBe(false);
    });

    it("verifier si la relation a été supprimer de la liste", () => {
      projectComponent.addRelation(relation1);
      projectComponent.addRelation(relation2);
      projectComponent.addRelation(relation3);
      // on supprime relation 2
      projectComponent.deleteRelation(relation2);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(
        relation2
      );
      // valider avec la fonction
      expect(projectComponent.isExist(relation2)).toBe(false);
    });

    it("verifier si la relation null ne peut pas etre ajouter dans la liste", () => {
      projectComponent.addRelation(relation1);
      projectComponent.addRelation(relation2);
      projectComponent.addRelation(null);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(null);
    });
  });

  describe("Events", () => {
    const validResult = {
      eventName: "event",
      attributs: "a",
      etiquettes: "a",
      type: "a",
      eventColor: "#ffffff"
    };

    it("should throw an error if the closing payload is null", () => {
      const closedHandlerPayload = null;
      expect(() => {
        projectComponent.addEventAfterClosedHandler(closedHandlerPayload);
      }).toThrow();
    });

    it("should map result to event properly", () => {
      expect(projectComponent.mapValidResultToEvent(validResult)).toEqual({
        name: validResult.eventName,
        attributs: validResult.attributs.split(","),
        etiquettes: validResult.etiquettes.split(","),
        type: validResult.type,
        color: validResult.eventColor
      });
    });

    it("should add the event to the current project's events if provided with a valid result", () => {
      projectComponent.addEventAfterClosedHandler(validResult);
      expect(projectComponent.currentProject.events).toContain(
        projectComponent.mapValidResultToEvent(validResult)
      );
    });

    it("should alert the user when trying to add an event that already exists", () => {
      spyOn(window, "alert");
      projectComponent.addEventAfterClosedHandler(validResult);
      projectComponent.addEventAfterClosedHandler(validResult);
      expect(window.alert).toHaveBeenCalledWith("This event already exists");
    });
  });

  describe("Annotators", () => {
    const validAnnResult = {
      uid: "1234",
      email: "test@UQOAnnotator.ca"
    };

    it("Should be able to add an annotator", () => {
      projectComponent.addAnnotatorAfterClosedHandler(validAnnResult);
      expect(projectComponent.currentProject.annotators).toContain(
        validAnnResult.uid
      );
      expect(projectComponent.annotators).toContain(validAnnResult);
    });

    it("Should be able to delete an annotator", () => {
      projectComponent.addAnnotatorAfterClosedHandler(validAnnResult);
      expect(projectComponent.currentProject.annotators).toContain(
        validAnnResult.uid
      );
      expect(projectComponent.annotators).toContain(validAnnResult);
      projectComponent.deleteAnnotator(validAnnResult.uid);
      expect(projectComponent.currentProject.annotators).not.toContain(
        validAnnResult.uid
      );
      expect(projectComponent.annotators).not.toContain(validAnnResult);
    });

    it("Should not be able to add an already added annotator", () => {
      spyOn(window, "alert");
      projectComponent.addAnnotatorAfterClosedHandler(validAnnResult);
      projectComponent.addAnnotatorAfterClosedHandler(validAnnResult);
      expect(window.alert).toHaveBeenCalledWith(
        "This annotator already exists"
      );
    });
  });

  describe("Administrators", () => {
    const validAdminResult = {
      uid: "1234",
      email: "test@UQOAnnotator.ca"
    };

    it("Should be able to add an admin", () => {
      projectComponent.addAdminAfterClosedHandler(validAdminResult);
      expect(projectComponent.currentProject.admin).toContain(
        validAdminResult.uid
      );
      expect(projectComponent.admin).toContain(validAdminResult);
    });

    it("Should be able to delete an admin", () => {
      projectComponent.addAdminAfterClosedHandler(validAdminResult);
      expect(projectComponent.currentProject.admin).toContain(
        validAdminResult.uid
      );
      expect(projectComponent.admin).toContain(validAdminResult);
      projectComponent.deleteAdmin(validAdminResult.uid);
      expect(projectComponent.currentProject.admin).not.toContain(
        validAdminResult.uid
      );
      expect(projectComponent.admin).not.toContain(validAdminResult);
    });

    it("Should not be able to add an already added admin", () => {
      spyOn(window, "alert");
      projectComponent.addAdminAfterClosedHandler(validAdminResult);
      projectComponent.addAdminAfterClosedHandler(validAdminResult);
      expect(window.alert).toHaveBeenCalledWith("This admin already exists");
    });
  });
});
