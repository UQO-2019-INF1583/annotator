import { AuthService } from '../../shared/security/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProjectService } from './project.service';
import { ProjectManagerService } from '../../adm/projectManager/projectManager.service';

// data mocks


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

export const projectServiceMocks: IProjectMocks = {
  authService: authServiceMock,
  angularFirestore: angularFirestoreMock,
  projectService: projectServiceMock,
  projectManagerService: projectManagerMock
}

