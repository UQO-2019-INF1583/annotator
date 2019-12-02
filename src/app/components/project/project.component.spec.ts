import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatDialog,
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
    // import db from '../../../../firestore-export.json';
    // const Projects = Object.values(db.Projects);
    // let project = Projects.find(p => p.title === "Test");
    // projectComponent.annotators = project.annotators;
    // projectComponent.admin = project.admin;  });
  });

  it('should create component', () => {
    expect(projectComponent).toBeDefined();
  });

  describe('Description project', () => {
    it('visitor or annotator should not be see button edit', () => {
      const spy = spyOn(projectComponent, 'isAdmin').and.returnValue(false);
      projectFixture.detectChanges();
      const buttonEdit = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-edit'
      );
      expect(buttonEdit).toBeNull();
    });

    it('admin should be see button edit', () => {
      const spy = spyOn(projectComponent, 'isAdmin').and.returnValue(true);
      projectFixture.detectChanges();
      const buttonEdit = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-edit'
      );
      expect(buttonEdit).toBeDefined();
    });

    it('should be see button save and cancel if button edit is clicked', () => {
      const spy = spyOn(projectComponent, 'isAdmin').and.returnValue(true);
      projectFixture.detectChanges();
      const buttonEdit = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-edit'
      );
      buttonEdit.click();
      projectFixture.detectChanges();
      const buttonSave = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-save'
      );
      const buttonCancel = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-cancel'
      );
      expect(projectComponent.isEdit).toBeTruthy();
      expect(buttonSave).toBeDefined();
      expect(buttonCancel).toBeDefined();
    });

    it('should be to edit title project and describe of project', () => {
      const spy = spyOn(projectComponent, 'isAdmin').and.returnValue(true);
      projectFixture.detectChanges();
      const buttonEdit = projectFixture.debugElement.nativeElement.querySelector(
        '.btn-edit'
      );
      buttonEdit.click();
      projectFixture.detectChanges();
      const projetDescribe = projectFixture.debugElement.nativeElement.querySelector(
        '.area-describe-project'
      );
      const projetTitle = projectFixture.debugElement.nativeElement.querySelector(
        '.projetTitle'
      );
      expect(projetDescribe.disabled).toBeFalsy();
      expect(projetTitle.disabled).toBeFalsy();
    });
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

  xdescribe('Attributs', () => {
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

  xdescribe('Relations', () => {
    it('should alert the user when trying to add a relation that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addRelation(relationMock.valid1);
      projectComponent.addRelation(relationMock.valid1);
      expect(window.alert).toHaveBeenCalledWith('This relation already exists');
    });

    it('should add the relation to the current project\'s relation', () => {
      projectComponent.addRelation(relationMock.valid1);
      expect(projectComponent.currentProject.relations).toContain(
        relationMock.valid1
      );
    });

    it('should be able to delete a relation', () => {
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

  xdescribe('Events', () => {
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

  xdescribe('Annotators', () => {
    it('should be able to add an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(
        annotatorMock.result.valid1
      );
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(
        annotatorMock.result.valid1
      );
    });

    it('should be able to delete an annotator', () => {
      projectComponent.addAnnotatorAfterClosedHandler(
        annotatorMock.result.valid1
      );
      expect(projectComponent.currentProject.annotators).toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).toContain(
        annotatorMock.result.valid1
      );
      projectComponent.deleteAnnotator(annotatorMock.result.valid1.uid);
      expect(projectComponent.currentProject.annotators).not.toContain(
        annotatorMock.result.valid1.uid
      );
      expect(projectComponent.annotators).not.toContain(
        annotatorMock.result.valid1
      );
    });

    it('should alert the user when trying to add an annotator that already exists', () => {
      spyOn(window, 'alert');
      projectComponent.addAnnotatorAfterClosedHandler(
        annotatorMock.result.valid1
      );
      projectComponent.addAnnotatorAfterClosedHandler(
        annotatorMock.result.valid1
      );
      expect(window.alert).toHaveBeenCalledWith(
        'This annotator already exists'
      );
    });
  });

  xdescribe('Administrators', () => {
    it('should be able to add an admin', () => {
      projectComponent.addAdminAfterClosedHandler(adminMock.result.valid1);
      expect(projectComponent.currentProject.admin).toContain(
        adminMock.result.valid1.uid
      );
      expect(projectComponent.admin).toContain(adminMock.result.valid1);
    });

    it('should be able to delete an admin', () => {
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
