import { Relation } from './relation.model';
import { Attribute } from './attribute.model';
import { Entite } from './entite.model';
import { Doc } from './document.model';
import { Event } from './event.model';

type indices = number[][];
type id = string;

interface EntityAnnotation {
  id: id;
  type: Entite;
  locations: indices;
}

interface AttributeAnnotation {
  id: id;
  type: Attribute;
  target: string;
}

interface RelationAnnotation {
  id: id;
  type: Relation;
  from: string;
  to: string;
}

interface EventAnnotation {
  id: id;
  event: Event;
  locations: indices;
  links: EventLink[];
}

interface EventLink {
  entityId: id;
  type: string;
}

export class AnnotatedDocument extends Doc {
  entities: EntityAnnotation[];
  attributes: AttributeAnnotation[];
  relations: RelationAnnotation[];
  event: EventAnnotation[];

  constructor(document: Doc, text: string) {
    super(document.documentId, document.title, document.projectId);
    this.text = text;
  }
}
