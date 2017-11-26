// structure de données utilisée pour représenter une annotation

class Annotation {

  static cats: string[]; // all project categories
  static colors: string[] = // colors corresponding
    ['#C0C0C0', '#808080' /*, ... */ ];

  begin: int; // beginning of annotation
  end: int; // end of annotation
  category: string;

  constructor() {
  }

}
