import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import {
  projectMocks,
  relationMock,
  attributMock,
  entiteMock,
  eventMock,
  adminMock,
  annotatorMock
} from './project.component.mock';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../shared/security/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProjectComponent } from './project.component';
import { ProjectManagerService } from '../../adm';
import { ProjectService } from './project.service';
import { RouterTestingModule } from '@angular/router/testing';

// TODO: Replace fdescribe with describe once the iteration is done
fdescribe('Projet', () => {
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

  it('Should create component', () => {
    expect(projectComponent).toBeDefined();
  });

  describe('Entities', () => {
    it('should add the entite to the current project\'s entities if provided { with a valid } result', () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid3);
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('The category already exists');
    });

    it('should alert the user when trying to add an entities using an already used color', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid3);
      expect(window.alert).toHaveBeenCalledWith(
        'The chosen color is already used'
      );
      expect(projectComponent.currentProject.categories).not.toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it('should alert the user when trying to add an entities using an already used name and change the color if it\'s different', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid2);
      expect(window.alert).toHaveBeenCalledWith('Replacing color');
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(entiteMock.valid2)
      );
    });

    it('Should be able to delete an entity', () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.result.valid3);
      expect(projectComponent.currentProject.categories).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
      projectComponent.deleteCategory(entiteMock.valid3.name);
      expect(projectComponent.currentProject.categories).not.toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });
  });

  describe('Attributs', () => {
    it('should add the attribute to the current project\'s attributes if provided { with a valid } result', () => {
      projectComponent.addAttributesAfterClosedHandler(attributMock.result.valid1);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(attributMock.valid1)
      );
    });

    it('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addAttributesAfterClosedHandler(attributMock.result.valid1);
      projectComponent.addAttributesAfterClosedHandler(attributMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This attribute already exists'
      );
    });

    it('Should be able to delete an attribut', () => {
      projectComponent.addAttributesAfterClosedHandler(attributMock.result.valid1);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(attributMock.valid1)
      );
      projectComponent.deleteAttribute(attributMock.valid1);
      expect(projectComponent.currentProject.attributes).not.toContain(
        jasmine.objectContaining(attributMock.valid1)
      );
    });
  });

  describe('Relations', () => {
    it('affiche le message d\'erreur quand on ajoute deux fois la meme relation', () => {
      spyOn(window, 'alert');
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This relation already exists');
    });

    it('verifier si la relation ajouter existe dans la liste', () => {
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid2);
      projectComponent.addRelation(relationMock.valid3);
      expect(projectComponent.currentProject.relations).toContain(relationMock.valid2);
      expect(projectComponent.currentProject.relations).toContain(relationMock.valid3);
    });

    it('verifier si la relation ajouter n\'existe pas dans la liste', () => {
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid3);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(
        relationMock.valid2
      );
      // valider avec la fonction
      expect(projectComponent.isExist(relationMock.valid2)).toBe(false);
    });

    it('verifier si la relation a été supprimer de la liste', () => {
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid2);
      projectComponent.addRelation(relationMock.valid3);
      // on supprime relation 2
      projectComponent.deleteRelation(relationMock.valid2);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(
        relationMock.valid2
      );
      // valider avec la fonction
      expect(projectComponent.isExist(relationMock.valid2)).toBe(false);
    });

    it('verifier si la relation null ne peut pas etre ajouter dans la liste', () => {
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid2);
      projectComponent.addRelation(null);
      // valider avec jasmine
      expect(projectComponent.currentProject.relations).not.toContain(null);
    });
  });

  describe('Events', () => {
    it('should throw an error if the closing payload is null', () => {
      const closedHandlerPayload = null;
      expect(() => {
        projectComponent.addEventAfterClosedHandler(closedHandlerPayload);
      }).toThrow();
    });

    it('should map result to event properly', () => {
      expect(projectComponent.mapValidResultToEvent(eventMock.result.valid1)).toEqual({
        name: eventMock.result.valid1.eventName,
        attributs: eventMock.result.valid1.attributs.split(','),
        etiquettes: eventMock.result.valid1.etiquettes.split(','),
        type: eventMock.result.valid1.type,
        color: eventMock.result.valid1.eventColor
      });
    });

    it('should add the event to the current project\'s events if provided { with a valid } result', () => {
      projectComponent.addEventAfterClosedHandler(eventMock.result.valid1);
      expect(projectComponent.currentProject.events).toContain(
        projectComponent.mapValidResultToEvent(eventMock.result.valid1)
      );
    });

    it('should alert the user when trying to add an event that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addEventAfterClosedHandler(eventMock.result.valid1);
      projectComponent.addEventAfterClosedHandler(eventMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('This event already exists');
    });
  });

  describe('Annotators', () => {
    it('Should be able to add an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(annotatorMock.result.valid1);
    });

    it('Should be able to delete an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(annotatorMock.result.valid1);
      projectComponent.deleteAnnotator(annotatorMock.result.valid1.uid);
      expect(projectComponent.currentProject.annotators).not.toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).not.toContain(annotatorMock.result.valid1);
    });

    it('Should not be able to add an already added annotator', () => {
      spyOn(window, 'alert');
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This annotator already exists'
      );
    });
  });

  describe('Administrators', () => {
    it('Should be able to add an admin', () => {
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(projectComponent.currentProject.admin).toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).toContain(adminMock.result.valid1);
    });

    it('Should be able to delete an admin', () => {
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(projectComponent.currentProject.admin).toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).toContain(adminMock.result.valid1);
      projectComponent.deleteAdmin(adminMock.result.valid1.uid);
      expect(projectComponent.currentProject.admin).not.toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).not.toContain(adminMock.result.valid1);
    });

    it('Should not be able to add an already added admin', () => {
      spyOn(window, 'alert');
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('This admin already exists');
    });
  });
});
