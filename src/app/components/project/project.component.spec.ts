import { ProjectComponent } from './project.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatToolbarModule, MatListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/security/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProjectService } from './project.service';
import { ProjectManagerService } from '../../adm';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { projectMocks } from './project.component.mock';

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
        BrowserAnimationsModule
      ],
      declarations: [
        ProjectComponent
      ],
      providers: [
        { provide: AngularFirestore, useValue: projectMocks.angularFirestore },
        { provide: AuthService, useValue: projectMocks.authService },
        { provide: ProjectService, useValue: projectMocks.projectService },
        { provide: ProjectManagerService, useValue: projectMocks.projectManagerService }
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
    // TODO: Insert tests related to entities here
  });

  describe('Attributs', () => {
    // TODO: Insert tests related to attributs here
  });

  describe('Relations', () => {
    // TODO: Insert tests related to relations here
  });

  describe('Events', () => {
    // TODO: Insert tests related to events here
  });
});


