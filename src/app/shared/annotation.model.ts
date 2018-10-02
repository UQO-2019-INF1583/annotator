// structure de données utilisée pour représenter une annotation

export class Annotation {
  static cats: string[]; // all project categories
  static colors: string[] = ['#C0C0C0', '#808080' /*, ... */]; // colors corresponding

  begin: number; // beginning of annotation
  end: number; // end of annotation
  category: string;

  constructor() {}
}
