import { Project } from './project.model';
import { Relation } from './relation.model';
import { Attribute } from './attribute.model';
import { Entite } from './entite.model';
import { Doc } from './document.model';
import { Event } from './event.model';
import { DocData } from '../annotation/DocData';

type rangeTextSelection = [number, number];
type id = string;

interface Annotation {
  id: id;
}

interface EntityAnnotation extends Annotation, Entite {
  locations: rangeTextSelection[];
}

interface AttributeAnnotation extends Annotation, Attribute {
  target: id;
}

interface RelationAnnotation extends Annotation, Relation {
  from: RelationLink;
  to: RelationLink;
}

interface RelationLink {
  role: string;
  id: id;
}

interface EventAnnotation extends Annotation, Event {
  locations: rangeTextSelection[];
  links: EventLink[];
}

interface EventLink {
  type: string;
  id: id;
}

export class AnnotatedDocument extends Doc {
  private entities: EntityAnnotation[];
  private attributes: AttributeAnnotation[];
  private relations: RelationAnnotation[];
  private event: EventAnnotation[];

  constructor(document: Doc, text: string) {
    super(document.documentId, document.title, document.projectId);
    this.entities = [];
    this.attributes = [];
    this.relations = [];
    this.event = [];
    this.text = text;
  }

  toJSON(project: Project): string {
    let docData: DocData;
    docData.text = this.text;
    this.entities.forEach(x => {
      docData.entities.push([
        x.id,
        x.type,
        x.locations
      ]);
    })


    return JSON.stringify(docData);
  }
}
