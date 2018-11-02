import { AngularFirestore } from 'angularfire2/firestore';
import { Attribute } from '../../shared/attribute.model';
import { AuthService } from '../../shared/security/auth.service';
import { Entite } from '../../shared/entite.model';
import { ProjectManagerService } from '../../adm/projectManager/projectManager.service';
import { ProjectService } from './project.service';
import { Relation } from '../../shared/relation.model';

// data mocks
export const entiteMock = {
  valid2: {
    name: 'Test',
    type: 'Test',
    bgColor: '#2196F3',
    labels: ['Test']
  } as Entite,
  valid3: {
    name: 'Test3',
    type: 'Test3',
    bgColor: '#F44336',
    labels: ['Test3']
  } as Entite,
  result: {
    valid1: {
      entityName: 'Test',
      type: 'Test',
      etiquettes: 'Test',
      entityColor: '#F44336'
    },
    valid2: {
      entityName: 'Test',
      type: 'Test',
      etiquettes: 'Test',
      entityColor: '#2196F3'
    },
    valid3: {
      entityName: 'Test3',
      type: 'Test3',
      etiquettes: 'Test3',
      entityColor: '#F44336'
    }
  }
}

export const attributMock = {
  valid1: {
    name: 'Test',
    type: 'Test',
    valeurs: ['Test']
  } as Attribute,
  result: {
    valid1: {
      attributeName: 'Test',
      type: 'Test',
      valeurs: 'Test'
    }
  }
}

export const relationMock = {
  valid1: {
    name: 'Relation1',
    type: 'Type1',
    entity: 'Entite1',
    color: '#2196F3'
  } as Relation,
  valid2: {
    name: 'Relation2',
    type: 'Type2',
    entity: 'Entite2',
    color: '#2196F3'
  } as Relation,
  valid3: {
    name: 'Relation3',
    type: 'Type3',
    entity: 'Entite3',
    color: '#2196F3'
  } as Relation
}

export const eventMock = {
  result: {
    valid1: {
      eventName: 'event',
      attributs: 'a',
      etiquettes: 'a',
      type: 'a',
      eventColor: '#ffffff'
    }
  }
}

export const annotatorMock = {
  result: {
    valid1: {
      uid: '1234',
      email: 'test@UQOAnnotator.ca'
    }
  }
}

export const adminMock = {
  result: {
    valid1: {
      uid: '1234',
      email: 'test@UQOAnnotator.ca'
    }
  }
}

// service mocks
interface IProjectMocks {
  authService: Partial<AuthService>;
  angularFirestore: Partial<AngularFirestore>;
  projectService: Partial<ProjectService>;
  projectManagerService: Partial<ProjectManagerService>;
}

const authServiceMock: Partial<AuthService> = {
  isConnected: () => {
    return true;
  }
};

const angularFirestoreMock: Partial<AngularFirestore> = {};

const projectServiceMock: Partial<ProjectService> = {
  getProject: (id: string) => { }
};

const projectManagerMock: Partial<ProjectManagerService> = {
  getProject: (id: string) => {
    return new Promise(resolve => {
      resolve('test');
    });
  }
};

export const projectMocks: IProjectMocks = {
  authService: authServiceMock,
  angularFirestore: angularFirestoreMock,
  projectService: projectServiceMock,
  projectManagerService: projectManagerMock
};
