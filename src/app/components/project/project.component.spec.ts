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

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../shared/security/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProjectComponent } from './project.component';
import { ProjectManagerService } from '../../adm';
import { ProjectService } from './project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { YesNoDialogBoxComponent } from '../yes-no-dialog-box/yes-no-dialog-box.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs/Observable';

describe('Projet', () => {
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
        MatSelectModule,
      ],
      declarations: [ProjectComponent, YesNoDialogBoxComponent],
      providers: [
        { provide: AngularFirestore, useValue: projectMocks.angularFirestore },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectMocks.projectService },
        { provide: ProjectManagerService, useValue: projectMocks.projectManagerService }
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ YesNoDialogBoxComponent ],
      }
    }).compileComponents();

    projectFixture = TestBed.createComponent(ProjectComponent);
    projectFixture.detectChanges();
    projectComponent = projectFixture.componentInstance;
  });

  it('should create component', () => {
    expect(projectComponent).toBeDefined();
  });

  describe('Entities', () => {
    it('should add the entite to the current project\'s entities if provided { with a valid } result', () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('The entity already exists');
    });

    it('should alert the user when trying to add an entities using an already used color', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(window.alert).toHaveBeenCalledWith(
        'The chosen color is already used'
      );
      expect(projectComponent.currentProject.entities).not.toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    it('should alert the user when trying to add an entities using an already used name and change the color if it\'s different', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid2);
      expect(window.alert).toHaveBeenCalledWith('Replacing color');
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid2)
      );
    });

    it('should be able to delete an entity', () => {
      spyOn(projectComponent.dialog, 'open').and.returnValue({afterClosed: () => Observable.of({response: true})});
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

  describe('Attributs', () => {
    it('should add the attribute to the current project\'s attributes if provided { with a valid } result', () => {
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(attributMock.valid1)
      );
    });

    it('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This attribute already exists'
      );
    });

    it('should be able to delete an attribut', () => {
      spyOn(projectComponent.dialog, 'open').and.returnValue({afterClosed: () => Observable.of({response: true})});
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
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
    it('should alert the user when trying to add a relation that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This relation already exists');
    });

    it('should add the relation to the current project\'s relation', () => {
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations).toContain(relationMock.valid1);
    });

    it('should be able to delete a relation', () => {
      spyOn(projectComponent.dialog, 'open').and.returnValue({afterClosed: () => Observable.of({response: true})});
      // Adding valid1
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations).toContain(
        relationMock.valid1
      );

      // Removing valid1
      projectComponent.deleteRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations).not.toContain(
        relationMock.valid1
      );
    });

    it('should not add an undefined relation to the current project\'s relation', () => {
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations.length).toBe(1);
      projectComponent.addRelation(relationMock.undefined);
      expect(projectComponent.currentProject.relations.length).toBe(1);
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
      expect(projectComponent.mapValidResultToEvent(eventMock.valid1)).toEqual({
        name: eventMock.valid1.name,
        attributes: eventMock.valid1.attributes[0].split(','),
        labels: eventMock.valid1.labels[0].split(','),
        type: eventMock.valid1.type,
        bgColor: eventMock.valid1.bgColor,
        arcs: [],
        borderColor: 'darken',
        children: [],
        unused: false
      });
    });

    it('should add the event to the current project\'s events if provided with a valid result', () => {
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      expect(projectComponent.currentProject.events).toContain(
        projectComponent.mapValidResultToEvent(eventMock.valid1)
      );
    });

    it('should alert the user when trying to add an event that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This event already exists');
    });
  });

  describe('Annotators', () => {
    it('should be able to add an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(annotatorMock.result.valid1);
    });

    it('should be able to delete an annotator', () => {
      spyOn(projectComponent.dialog, 'open').and.returnValue({afterClosed: () => Observable.of({response: true})});
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

    it('should alert the user when trying to add an annotator that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This annotator already exists'
      );
    });
  });

  describe('Administrators', () => {
    it('should be able to add an admin', () => {
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(projectComponent.currentProject.admin).toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).toContain(adminMock.result.valid1);
    });

    it('should be able to delete an admin', () => {
      spyOn(projectComponent.dialog, 'open').and.returnValue({afterClosed: () => Observable.of({response: true})});
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

    it('should alert the user when trying to add an admin that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('This admin already exists');
    });
  });
});
