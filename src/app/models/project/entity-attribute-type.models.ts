export class EntityAttributeType {
  type: string; // name of the attribute. ex : "Notorious"
  values: EntityAttributeValues; // all values of the attributes. ex : { 'Notorious': { 'glyph': '★' } }
  bool: string; // same as the type. ex : "Notorious"

  constructor(
    type: string = "",
    values: EntityAttributeValues = new EntityAttributeValues(),
    bool: string = ""
  ) {
    this.type = type;
    this.values = values;
    this.bool = type;
  }

  static generateEmpty(): EntityAttributeType {
    return {
      type: "",
      values: new EntityAttributeValues(),
      bool: ""
    };
  }
}

// Classe qui représente une valeur contenue par un attribut
export class EntityAttributeValues {
  value: string;
  glyph: Glyph;

  constructor(value: string = "", glyph: Glyph = new Glyph()) {
    this.value = value;
    this.glyph = glyph;
  }
}

export class Glyph {
  value: string;

  constructor(value: string = "") {
    this.value = value;
  }
}
