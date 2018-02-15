// structure de données utilisée pour représenter un projet
import { Doc } from './document.model';
import { Categorie } from './categorie.model';

export class Project {
  projectId: string;
  titre: string; 
  description: string;
  admin: string;          // user id
  annotators: string[];   // array of user ids
  corpus: Doc[]; //array of document
  categories: Categorie[]; //array of categorie
 // corpus: string[];       // array of document names
  // categories; see ./annotation.model.ts

  constructor() {
  }

}
