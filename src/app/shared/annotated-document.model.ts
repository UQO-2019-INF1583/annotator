import { Relation } from './relation.model';
import { Attribute } from './attribute.model';
import { Entity } from './entity.model';
import { Doc } from './document.model';
import { Event } from './event.model';
import {
  DocumentData,
  rawRelation,
  rawEventLink,
  rawAttribute,
  rawEntity
} from '../annotation/document-data';
import { Project } from './project.model';
import { Arc } from './arc.model';
import * as firebase from 'firebase';





// ===============AnnotatedDocument========================

interface IAnnotation {
  id: string;
  AnnotatorID: any;
  EtatAnnotation: any;
  DateHeure: any;
}

// tslint:disable-next-line:interface-over-type-literal
export type AnnotatedDocument = {
  userId: any;
  etatDocument: any;
  documentId: string;
  title: string;
  file: any;
  text: string;
  projectId: string;
  entities: EntityAnnotation[];
  attributes: AttributeAnnotation[];
  relations: RelationAnnotation[];
  events: EventAnnotation[];
}


export class AnnotatedDocumentUtils {
  static initialiseAnnotatedDocument(document: Doc): AnnotatedDocument {
    const annotatedDocument: AnnotatedDocument = {
      userId: document.UserId,
      etatDocument: document.etatDocument,
      documentId: document.documentId,
      title: document.title,
      projectId: document.projectId,
      file: document.file,
      text: document.text,
      entities: [],
      attributes: [],
      relations: [],
      events: []
    }
    return annotatedDocument;
  }
}







interface RangeTextSelection {
  start: number,
  end: number
};

// ===========================Attributs=========================//

export interface AttributeAnnotation extends IAnnotation, Attribute {
  target: string;
}
export class AttributeAnnotationUtils {
  static generateEmpty(): AttributeAnnotation {
    return {
      AnnotatorID: '',
      EtatAnnotation: '',
      DateHeure: '',
      id: '',
      name: '',
      type: '',
      labels: [],
      unused: false,
      values: '',
      target: ''
    }
  }
}

// ===========================Entities=========================//
export interface EntityAnnotation extends IAnnotation, Entity {
  locations: RangeTextSelection[];
}

export class EntityAnnotationUtils {
  static generateEmpty(): EntityAnnotation {
    return {
      AnnotatorID: '',
      EtatAnnotation: '',
      DateHeure: '',
      id: '',
      locations: [],
      name: '',
      type: '',
      labels: [],
      bgColor: '',
      borderColor: 'darken',
      unused: false,
      arcs: [],
      children: []
    }
  }
}


// ===========================Events=========================//
export interface EventLink extends IAnnotation {
  type: string;
}
export interface EventAnnotation extends IAnnotation, Event {
  locations: RangeTextSelection[];
  links: EventLink[];
  triggerId: string;
}

export class EventAnnotationUtils {
  static generateEmpty(): EventAnnotation {
    return {
      AnnotatorID: '',
      EtatAnnotation: '',
      DateHeure: '',
      id: '',
      locations: [],
      links: [],
      triggerId: '',
      name: '',
      type: '',
      labels: [],
      bgColor: '',
      borderColor: 'darken',
      attributes: [],
      children: [],
      unused: false,
      arcs: []
    }
  }
}

export class EventLinkUtils {
  static generateEmpty(): EventLink {
    return {
      AnnotatorID: '',
      EtatAnnotation: '',
      DateHeure: '',
      id: '',
      type: ''
    }
  }
}


// ===========================Relations=========================//

export interface RelationLink extends IAnnotation {
  role: string;
}

export interface RelationAnnotation extends IAnnotation, Relation {
  from: RelationLink;
  to: RelationLink;
}

export class RelationAnnotationUtils {
  static generateEmpty(): RelationAnnotation {
    return {
      AnnotatorID: '',
      EtatAnnotation: '',
      DateHeure: '',
      id: '',
      from: {
        id: '', role: '', AnnotatorID: '', EtatAnnotation: '',
        DateHeure: ''
      },
      to: {
        id: '', role: '', AnnotatorID: '',
        EtatAnnotation: '',
        DateHeure: '',
      },
      type: '',
      labels: [],
      dashArray: '3,3',
      color: '',
      attributes: [],
      args: []
    }
  }
}





