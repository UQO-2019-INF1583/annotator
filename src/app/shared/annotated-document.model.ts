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

export class AnnotatedDocumentUtils {
  static fromJSON(json: string, project: Project, annotatedDocument: AnnotatedDocument): AnnotatedDocument {
    const docData: DocumentData = JSON.parse(json);

    annotatedDocument.entities = docData.entities.map(docEntity => {
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

    annotatedDocument.attributes = docData.attributes.map(docAttribute => {
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

    annotatedDocument.relations = docData.relations.map(docRelation => {
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



    for (let i = 0; i < annotatedDocument.events.length; i++) {
      const docTrigger = docData.triggers[i];
      const docEvent = docData.events[i];
      const projectEvent = project.events.find(e => e.type === docTrigger[1])

      const event: EventAnnotation = null;
      // Project event
      event.labels = projectEvent.labels;
      event.type = docTrigger[1];
      event.bgColor = projectEvent.bgColor;
      event.attributes = projectEvent.attributes;
      event.name = projectEvent.name;

      // Document event
      event.triggerId = docTrigger[0];
      event.locations = docTrigger[2];
      event.id = docEvent[0];

      event.links = docEvent[2].map(docLink => {
        const link: EventLink = null;
        link.id = docLink[1];
        link.type = docLink[0];
        return link;
      });

      annotatedDocument.events.push(event);
    }

    return annotatedDocument;

  }

  static toJSON(annotatedDocument: AnnotatedDocument): string {
    const docData: DocumentData = new DocumentData();
    docData.text = annotatedDocument.text;


    docData.entities = annotatedDocument.entities.map(entity => {
      const e: rawEntity = [entity.id, entity.type, entity.locations];
      return e;
    });

    docData.attributes = annotatedDocument.attributes.map(attribute => {
      const a: rawAttribute = [attribute.id, attribute.type, attribute.target];
      return a;
    });

    docData.relations = annotatedDocument.relations.map(relation => {
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

    docData.triggers = [];
    annotatedDocument.events.forEach(event => {
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

    docData.comments = [];
    docData.ctime = 1351154734.5055847;
    docData.messages = [];
    docData.modifications = [];
    docData.normalizations = [];
    docData.source_files = [];

    return JSON.stringify(docData);
  }
}

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
