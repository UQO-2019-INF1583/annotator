import { AngularFirestore } from 'angularfire2/firestore';
import { Attribute } from '../../shared/attribute.model';
import { AuthService } from '../../shared/security/auth.service';
import { Entity } from '../../shared/entity.model';
import { ProjectManagerService } from '../../adm/projectManager/projectManager.service';
import { ProjectService } from './project.service';
import { Relation } from '../../shared/relation.model';
import { Event } from '../../shared/event.model';

// data mocks
export const entiteMock = {
  valid1: {
    name: 'Test',
    type: 'Test',
    bgColor: '#F44336',
    labels: ['Test'],
  } as Entity,
  valid2: {
    name: 'Test',
    type: 'Test',
    bgColor: '#2196F3',
    labels: ['Test']
  } as Entity,
  valid3: {
    name: 'Test3',
    type: 'Test3',
    bgColor: '#F44336',
    labels: ['Test3']
  } as Entity,
  invalid4: {
    name: 'Test4Test4Test4Test4Test4Test4Tes',
    type: 'Test4',
    bgColor: '#F44336',
    labels: ['Test4']
  } as Entity,
}

export const attributMock = {
  valid1: {
    name: 'Test',
    type: 'Test',
  } as Attribute,
  invalid2: {
    name: 'Test2Test2Test2Test2Test2Test2Test2',
    type: 'Test2',
  } as Attribute,
}

export const relationMock = {
  valid1: {
    type: 'Type1',
    labels: ['Entite1'],
    color: '#2196F3',
    dashArray: '3,3',
    attributes: [],
    args: []
  } as Relation,
  valid2: {
    name: 'Relation2',
    type: 'Type2',
    labels: ['Entite2'],
    color: '#2196F3',
    dashArray: '3,3',
    attributes: [],
    args: []
  } as Relation,
  valid3: {
    name: 'Relation3',
    type: 'Type3',
    labels: ['Entite3'],
    color: '#2196F3',
    dashArray: '3,3',
    attributes: [],
    args: []
  } as Relation,
  invalid4: {
    name: 'Relation4RelationRelationRelationRelationRelation',
    type: 'Type4',
    labels: ['Entite4'],
    color: '#2345F3',
    dashArray: '3,3',
    attributes: [],
    args: []
  } as Relation,
}

export const eventMock = {
  valid1: {
    name: 'event',
    attributes: ['a'],
    labels: ['a'],
    type: 'a',
    bgColor: '#ffffff'
  } as Event,
  invalid2: {
    name: 'eventeventeventeventeventeventeventevent',
    attributes: ['a'],
    labels: ['a'],
    type: 'a',
    bgColor: '#ffffff'
  } as Event,
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
  getProject: (id: string) => {
    return new Promise(resolve => {
      resolve('test');
    });
  }
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
