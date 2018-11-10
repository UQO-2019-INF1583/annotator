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
import { Project } from './project.model';

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

  fromJSON(json: string, project: Project): void {
    const docData: DocumentData = JSON.parse(json);

    this.entities = docData.entities.map(docEntity => {
      const entity: EntityAnnotation = null;
      const project_entity = project.entities.find(e => e.type === docEntity[1])

      // Document entity
      entity.id = docEntity[0];
      entity.locations = docEntity[2];

      // Project entity
      entity.name = project_entity.name;
      entity.type = project_entity.type;
      entity.bgColor = project_entity.bgColor;
      entity.labels = project_entity.labels;

      return entity;
    });

    this.attributes = docData.attributes.map(docAttribute => {
      const attribute: AttributeAnnotation = null;
      const project_attribute = project.attributes.find(a => a.type === docAttribute[1])

      // Document attribute
      attribute.id = docAttribute[0];
      attribute.type = docAttribute[1];
      attribute.target = docAttribute[2];

      // Project attribute
      attribute.name = project_attribute.name;
      attribute.valeurs = project_attribute.valeurs;

      return attribute;
    });

    this.relations = docData.relations.map(docRelation => {
      const relation: RelationAnnotation = null;
      const project_relation = project.relations.find(r => r.type === docRelation[1])

      // Document relation
      relation.id = docRelation[0];
      relation.type = docRelation[1];
      relation.from.id = docRelation[2][0][0];
      relation.from.role = docRelation[2][0][1];
      relation.to.id = docRelation[2][1][0];
      relation.to.role = docRelation[2][1][1];

      // Project relation
      relation.color = project_relation.color;
      relation.entity = project_relation.entity;
      relation.name = project_relation.name;

      return relation;
    });

  }

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
