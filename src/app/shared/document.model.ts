// structure de données utilisée pour représenter un document

export class Doc {
  UserId: string;
  documentId: string;
  title: string;
  file: any;
  text: string;
  projectId: string;
  etatDocument: any;

  constructor(docId: string, title: string, projectId: string) {
    this.documentId = docId;
    this.title = title;
    this.projectId = projectId;
    this.file = '';
    this.projectId = '';
    this.etatDocument = 0;
  }
}