//Attribut d'un entité
export class AttributeType {
  type: string; // name of the attribute. ex : "Notorious"
  values: AttributeValue[]; // all values of the attributes. ex : { 'Notorious': { 'glyph': '★' } }
  valueString: string;
  bool: string; // same as the type. ex : "Notorious"
  name: string;

  constructor(
    name: string = "",
    type: string = "",
    bool: string = "",
    valueString: string = "",
    values: AttributeValue[] = []
  ) {
    this.name = name;
    this.type = type;
    this.bool = bool;
    this.valueString = valueString;
    this.values = values;
  }
}

// Classe qui représente une valeur contenue par un attribut
export class AttributeValue {
  box: string;
  glyph: string;
  dashArray: string;
  name: string;

  constructor(
    name: string = "",
    box: string = "none",
    glyph: string = "glyph",
    dashArray: string = "1,2"
  ) {
    this.box = box;
    this.glyph = glyph;
    this.dashArray = dashArray;
    this.name = name;
  }

  //méthode qui génère l'objet EntityAttributeValues
  //Cette méthode remplace l'utilisation du mot clé new, car firebase ne supporte pas les objets créés avec ce mot clé
  static generateAttributeValues(name): AttributeValue {
    return {
      box: "none",
      glyph: "glyph",
      dashArray: "1,2",
      name: name
    };
  }
}
