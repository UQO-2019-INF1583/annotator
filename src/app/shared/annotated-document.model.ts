import { Relation } from './relation.model';
import { Attribute } from './attribute.model';
import { Entite } from './entite.model';
import { Doc } from './document.model';
import { Event } from './event.model';
import {
  DocumentData,
  rawRelation,
  rawEventLink,
  rawAttribute,
  rawEntity
} from '../annotation/document-data';

type rangeTextSelection = [number, number];
type id = string;

interface IAnnotation {
  id: id;
}

interface EntityAnnotation extends IAnnotation, Entite {
  locations: rangeTextSelection[];
}

interface AttributeAnnotation extends IAnnotation, Attribute {
  target: id;
}

interface RelationAnnotation extends IAnnotation, Relation {
  from: RelationLink;
  to: RelationLink;
}

interface RelationLink extends IAnnotation {
  role: string;
}

interface EventAnnotation extends IAnnotation, Event {
  locations: rangeTextSelection[];
  links: EventLink[];
  triggerId: id;
}

interface EventLink extends IAnnotation {
  type: string;
}

export class AnnotatedDocument extends Doc {
  private entities: EntityAnnotation[];
  private attributes: AttributeAnnotation[];
  private relations: RelationAnnotation[];
  private events: EventAnnotation[];

  constructor(document: Doc, text: string) {
    super(document.documentId, document.title, document.projectId);
    this.entities = [];
    this.attributes = [];
    this.relations = [];
    this.events = [];
    this.text = text;
  }

  fromJSON(json: string): void {}

  toJSON(): string {
    const docData: DocumentData = null;
    docData.text = this.text;

    docData.entities = this.entities.map(entity => {
      const e: rawEntity = [entity.id, entity.type, entity.locations];
      return e;
    });

    docData.attributes = this.attributes.map(attribute => {
      const a: rawAttribute = [attribute.id, attribute.type, attribute.target];
      return a;
    });

    docData.relations = this.relations.map(relation => {
      const r: rawRelation = [
        relation.id,
        relation.type,
        [
          [relation.from.role, relation.from.id],
          [relation.to.role, relation.to.id]
        ]
      ];
      return r;
    });

    this.events.forEach(event => {
      docData.triggers.push([event.triggerId, event.type, event.locations]);
      docData.events.push([
        event.id,
        event.triggerId,
        event.links.map(link => {
          const l: rawEventLink = [link.type, link.id];
          return l;
        })
      ]);
    });

    return JSON.stringify(docData);
  }
}
