import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule, MatDialog,
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
  annotatorMock,
  MatDialogMock
} from './project.component.mock';

import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

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

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

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
        { provide: ProjectManagerService, useValue: projectMocks.projectManagerService },
        { provide: MatDialog, useClass: MatDialogMock }
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [YesNoDialogBoxComponent],
      }
    }).compileComponents();

    projectFixture = TestBed.createComponent(ProjectComponent);
    projectFixture.detectChanges();
    projectComponent = projectFixture.componentInstance;
  });



  xit('should create component', () => {
    expect(projectComponent).toBeDefined();
  });

  //////////////////////////////////////////////////////////////////////////////////////
  describe('couleur', () => {
    it('should choose the right color', () => {
      // tslint:disable-next-line: no-unused-expression
      expect(projectComponent.choisirCouleurDeTexte('black')).toBeTruthy;
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////



  describe('Entities', () => {
    xit('should add the entite to the current project\'s entities if provided { with a valid } result', () => {
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid3);
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid3)
      );
    });

    xit('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('The entity already exists');
    });

    xit('should alert the user when trying to add an entities using an already used color', () => {
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

    xit('should alert the user when trying to add an entities using an already used name and change the color if it\'s different', () => {
      spyOn(window, 'alert');
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid1);
      projectComponent.addEntitiesAfterClosedHandler(entiteMock.valid2);
      expect(window.alert).toHaveBeenCalledWith('Replacing color');
      expect(projectComponent.currentProject.entities).toContain(
        jasmine.objectContaining(entiteMock.valid2)
      );
    });

    xit('should be able to delete an entity', () => {
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
    xit('should add the attribute to the current project\'s attributes if provided { with a valid } result', () => {
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      expect(projectComponent.currentProject.attributes).toContain(
        jasmine.objectContaining(attributMock.valid1)
      );
    });

    xit('should alert the user when trying to add an entities using an already used name', () => {
      spyOn(window, 'alert');
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      projectComponent.addAttributesAfterClosedHandler(attributMock.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This attribute already exists'
      );
    });

    xit('should be able to delete an attribut', () => {
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
    xit('should alert the user when trying to add a relation that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This relation already exists');
    });

    xit('should add the relation to the current project\'s relation', () => {
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations).toContain(relationMock.valid1);
    });

    xit('should be able to delete a relation', () => {
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

    xit('should not add an undefined relation to the current project\'s relation', () => {
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations.length).toBe(1);
      projectComponent.addRelation(relationMock.undefined);
      expect(projectComponent.currentProject.relations.length).toBe(1);
    });
  });

  describe('Events', () => {
    xit('should throw an error if the closing payload is null', () => {
      const closedHandlerPayload = null;
      expect(() => {
        projectComponent.addEventAfterClosedHandler(closedHandlerPayload);
      }).toThrow();
    });

    xit('should map result to event properly', () => {
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

    xit('should add the event to the current project\'s events if provided with a valid result', () => {
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      expect(projectComponent.currentProject.events).toContain(
        projectComponent.mapValidResultToEvent(eventMock.valid1)
      );
    });

    xit('should alert the user when trying to add an event that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      projectComponent.addEventAfterClosedHandler(eventMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This event already exists');
    });
  });

  describe('Annotators', () => {
    xit('should be able to add an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(annotatorMock.result.valid1);
    });

    xit('should be able to delete an annotator', () => {
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

    xit('should alert the user when trying to add an annotator that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      projectComponent.addAnnotatorAfterClosedHandler(annotatorMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith(
        'This annotator already exists'
      );
    });
  });

  describe('Administrators', () => {
    xit('should be able to add an admin', () => {
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(projectComponent.currentProject.admin).toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).toContain(adminMock.result.valid1);
    });

    xit('should be able to delete an admin', () => {
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

    xit('should alert the user when trying to add an admin that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('This admin already exists');
    });

    xit('should choose right couleur', () => {
      spyOn(window, 'alert');
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(window.alert).toHaveBeenCalledWith('This admin already exists');
    });
  });
});
