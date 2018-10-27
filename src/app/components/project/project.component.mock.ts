import { AuthService } from '../../shared/security/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProjectService } from './project.service';
import { ProjectManagerService } from '../../adm/projectManager/projectManager.service';
import { Entite } from '../../shared/entite.model';
import { Attribute } from '../../shared/attribute.model';

// data mocks
export const validEntiteResult = {
    categoryName: 'Test',
    type: 'Test',
    etiquettes: 'Test',
    categoryColor: '#F44336'
}

export const validEntiteResult2 = {
    categoryName: 'Test',
    type: 'Test',
    etiquettes: 'Test',
    categoryColor: '#2196F3'
}

export const validEntiteResult3 = {
    categoryName: 'Test3',
    type: 'Test3',
    etiquettes: 'Test3',
    categoryColor: '#F44336'
}

export const validEntities2: Entite = {
    name: 'Test',
    type: 'Test',
    color: '#2196F3',
    labels: ['Test']
}

export const validEntities3: Entite = {
    name: 'Test3',
    type: 'Test3',
    color: '#F44336',
    labels: ['Test3']
}


export const validAttResult = {
    attributeName: 'Test',
    type: 'Test',
    valeurs: 'Test'
};

export const validAtt: Attribute = {
    name: 'Test',
    type: 'Test',
    valeurs: ['Test']
};

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

