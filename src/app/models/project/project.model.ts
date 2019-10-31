// structure de données utilisée pour représenter un projet
import { Doc } from "../document.model";

import {
  EntityAttributeType,
  EntityType,
  EventType,
  RelationType
} from "./index";

export class Project {
  id: string;
  title: string;
  description: string;
  state: number;
  date: Date;

  admin: string[]; // user ids
  annotators: string[]; // user ids

  corpus: Doc[];

  // Types
  entity_types: EntityType[];
  entity_attribute_types: EntityAttributeType[];
  relation_types: RelationType[];
  event_types: EventType[];
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

      entity_types: [],
      entity_attribute_types: [],
      relation_types: [],
      event_types: []
    };
  }
}
