/**
 * Le model relation
 * @param entity c'est etiquettes
 * @param color c'est la couleur
 * @param name c'est le titre ou nom
 */
export class Relation {
  name: string;
  color: string;
  entity: string;
  type: string;
  constructor(data: Relation) {
    this.name = data.name;
    this.entity = data.entity;
    this.type = data.type;
    this.color = data.color;
  }
}
