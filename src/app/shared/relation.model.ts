/**
 * Le model relation
 * @param entity c'est etiquettes
 * @param color c'est la couleur
 * @param name c'est le titre ou nom
 */
export class Relation {
  type: string;
  labels: string[];
  dashArray: string;
  color: string;
  attributes: string[];
  args: any[];

  constructor() {
    this.type = '';
    this.labels = [];
    this.dashArray = '3,3';
    this.color = '';
    this.attributes = [];
    this.args = [];
  }
}
