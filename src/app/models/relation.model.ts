/**
 * Le model relation
 * @param entity c'est etiquettes
 * @param color c'est la couleur
 * @param name c'est le titre ou nom
 */

import { ProjectService} from "../services/project/project.service";

export class Relation {
  type: string;
  labels: string[];
  dashArray: string;
  color: string;
  attributes: string[];
  args: any[];

  constructor() {

    let colors = ProjectService.getRandomLightAndDarkColor();

    this.type = "";
    this.labels = [""];
    this.dashArray = "3,3";
    this.color = colors.light;
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
