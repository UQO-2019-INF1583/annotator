// structure de données utilisée pour représenter un projet
import { Doc } from './document.model';
import { Entity } from './entity.model';
import { Event } from './event.model';
import { Attribute } from './attribute.model'
import { Relation } from './relation.model';

export interface Project {
  id: string;
  title: string;
  description: string;
  admin: string[]; // user ids
  annotators: string[]; // user ids
  corpus: Doc[];
  entities: Entity[];
  attributes: Attribute[];
  events: Event[];
  relations: Relation[];
}

export class ProjectUtils {
  static generateEmpty(): Project {
    return {
      id: '',
      title: '',
      description: '',
      admin: [],
      annotators: [],
      corpus: [],
      entities: [],
      attributes: [],
      events: [],
      relations: []
    }
  }
}

