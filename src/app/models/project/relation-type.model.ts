export class RelationType {
  type: string;
  labels: string[];
  dashArray: string;
  color: string;
  args: Argument[];

  constructor() {
    this.type = "";
    this.labels = [];
    this.dashArray = "3,3";
    this.color = "";
    this.args = [];
  }
}

class Argument {
  role: string;
  targets: string[];
}
