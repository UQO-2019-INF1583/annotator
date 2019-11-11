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
    this.type = "";
    this.labels = [];
    this.dashArray = "";
    this.color = "";
    this.attributes = [];
    this.args = [];

    this.args.push(new Args("", ""));
    this.args.push(new Args("", ""));
  }
}

export class Args {
  role: string;
  targets: string[];

  constructor(role: string, target: string) {
    this.role = role;
    this.targets = [];
    this.targets.push(target);
  }
}
