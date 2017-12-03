// structure de données utilisée pour représenter un projet

export class Project {
  projectId: string;
  admin: string;          // user id
  annotators: string[];   // array of user ids
  corpus: string[];       // array of document names
  // categories; see ./annotation.model.ts

  constructor() {
  }

}
