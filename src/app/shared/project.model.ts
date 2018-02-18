// structure de données utilisée pour représenter un projet
import { Doc } from './document.model';
import { Category } from './category.model';

export class Project {
  id: string;
  title: string;
  description: string;
  admin: string[]; // user ids
  annotators: string[]; // user ids
  corpus: Doc[];
  categories: Category[];

  constructor() {
  }

}
