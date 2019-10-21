// structure de données utilisée pour représenter un projet
import { Doc } from "./document.model";
import { Entity } from "./entity.model";
import { Event } from "./event.model";
import { EntityAttributeTypes } from "./entityAttribute.model";
import { Relation } from "./relation.model";

export interface Project {
  id: string;
  title: string;
  description: string;
  date: Date;
  admin: string[]; // user ids
  annotators: string[]; // user ids
  corpus: Doc[];
  entities: Entity[];
  attributes: EntityAttributeTypes[];
  events: Event[];
  relations: Relation[];
}

export class ProjectUtils {
  static test(): void {
    let date = Date.now();
    console.log(date.toLocaleString);
  }
  today = Date.now();

  static generateEmpty(): Project {
    return {
      id: "",
      title: "",
      date: new Date(),
      description: "",
      admin: [],
      annotators: [],
      corpus: [],
      entities: [],
      attributes: [],
      events: [],
      relations: []
    };
  }
}
