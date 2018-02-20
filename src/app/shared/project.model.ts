// structure de données utilisée pour représenter un projet
import { Doc } from './document.model';
import { Categorie } from './categorie.model';

export class Project {
  projectId: string;
  title: string;
  description: string;
  admin: string;          // user id
  annotators: string[];   // array of user ids
  corpus: string[];       // array of document names
  categories: any[];      // see ./annotation.model.ts

  constructor() {
  }

}
