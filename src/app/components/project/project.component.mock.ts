import { AuthService } from '../../shared/security/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProjectService } from './project.service';
import { ProjectManagerService } from '../../adm/projectManager/projectManager.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material';

// data mocks
@NgModule({
    imports: [
        FormsModule,
        MatFormFieldModule,
        CommonModule,
        MatSelectModule,
        MatDialogModule],
    declarations: [AddCategoryComponent],
    entryComponents: [
        AddCategoryComponent,
    ]
})
export class TestAddCategoryModule { }

// service mocks
interface IProjectMocks {
  authService: Partial<AuthService>;
  angularFirestore: Partial<AngularFirestore>;
  projectService: Partial<ProjectService>;
  projectManagerService: Partial<ProjectManagerService>
}

const authServiceMock: Partial<AuthService> = {
  isConnected: () => {
    return true;
  }
}

const angularFirestoreMock: Partial<AngularFirestore> = {
}

const projectServiceMock: Partial<ProjectService> = {
  getProject: (id: string) => { }
}

const projectManagerMock: Partial<ProjectManagerService> = {
  getProject: (id: string) => {
    return new Promise((resolve) => {
      resolve('test');
    })
  }
}

export const projectMocks: IProjectMocks = {
  authService: authServiceMock,
  angularFirestore: angularFirestoreMock,
  projectService: projectServiceMock,
  projectManagerService: projectManagerMock
}

