// structure de données utilisée pour représenter un document

export class Doc {
  documentId: string;
  title: string;
  file: any;
  text: string;
  projectId: string;

  constructor(docId: string, title: string, projectId: string) {
    this.documentId = docId;
    this.title = title;
    this.projectId = projectId;
    this.file = '';
    this.projectId = '';
  }

}
