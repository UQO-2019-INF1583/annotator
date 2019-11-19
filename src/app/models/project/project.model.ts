// structure de données utilisée pour représenter un projet
import { Doc } from "../document.model";

import { AttributeType, EntityType, EventType, RelationType } from "./index";

export class Project {
  // Basic project parameters
  id?: string;
  title?: string;
  description?: string;
  state?: number;
  date?: Date;

  // Users
  admin?: string[]; // user ids
  annotators?: string[]; // user ids

  // Corpus
  corpus?: Doc[];

  // Type Declarations
  entities?: EntityType[];
  attributes?: AttributeType[];
  relations?: RelationType[];
  events?: EventType[];
}

export class ProjectUtils {
  static generateEmpty(): Project {
    return {
      id: "",
      title: "",
      description: "",
      state: 0,
      date: new Date(),

      admin: [],
      annotators: [],

      corpus: [],

      entities: [],
      attributes: [],
      relations: [],
      events: []
    };
  }
}
