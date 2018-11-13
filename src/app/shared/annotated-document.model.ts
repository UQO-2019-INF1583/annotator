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

export class AnnotatedDocument extends Doc {
  entities: EntityAnnotation[];
  attributes: AttributeAnnotation[];
  relations: RelationAnnotation[];
  events: EventAnnotation[];

  constructor(document: Doc) {
    super(document.documentId, document.title, document.projectId);
    this.entities = [];
    this.attributes = [];
    this.relations = [];
    this.events = [];
    this.text = document.text;
  }
}

interface RangeTextSelection {
  start: number,
  end: number
};

type id = string;

interface IAnnotation {
  id: id;
}

export interface EntityAnnotation extends IAnnotation, Entity {
  locations: RangeTextSelection[];
}

export class EntityAnnotationUtils {
  static generateEmpty(): EntityAnnotation {
    return {
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

export interface AttributeAnnotation extends IAnnotation, Attribute {
  target: id;
}

export class AttributeAnnotationUtils {
  static generateEmpty(): AttributeAnnotation {
    return {
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

export interface RelationAnnotation extends IAnnotation, Relation {
  from: RelationLink;
  to: RelationLink;
}

export class RelationAnnotationUtils {
  static generateEmpty(): RelationAnnotation {
    return {
      id: '',
      from: { id: '', role: '' },
      to: { id: '', role: '' },
      type: '',
      labels: [],
      dashArray: '3,3',
      color: '',
      attributes: [],
      arcs: []
    }
  }
}

export interface RelationLink extends IAnnotation {
  role: string;
}

export interface EventAnnotation extends IAnnotation, Event {
  locations: RangeTextSelection[];
  links: EventLink[];
  triggerId: id;
}

export class EventAnnotationUtils {
  static generateEmpty(): EventAnnotation {
    return {
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

export interface EventLink extends IAnnotation {
  type: string;
}

export class EventLinkUtils {
  static generateEmpty(): EventLink {
    return {
      id: '',
      type: ''
    }
  }
}
