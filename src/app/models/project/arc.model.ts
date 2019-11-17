export class Arc {
  arrowHead: string;
  color: string;
  labels: string[];
  dashArray: string;
  hotkey: string;
  type: string;
  targets: string[];

  constructor(
    arrowHead: string = "",
    color: string = "",
    labels: string[] = [],
    dashArray: string = "",
    hotkey: string = "",
    type: string = "",
    targets: string[] = []
  ) {
    this.arrowHead = arrowHead;
    this.color = color;
    this.labels = labels;
    this.dashArray = dashArray;
    this.hotkey = hotkey;
    this.type = type;
    this.targets = targets;
  }

  empty(
    arrowHead: string = "triangle,5",
    color: string = "black",
    labels: string[] = [],
    dashArray: string = ",",
    hotkey: string = "T",
    type: string = "",
    targets: string[] = []
  ) {
    this.arrowHead = arrowHead;
    this.color = color;
    this.labels = labels;
    this.dashArray = dashArray;
    this.hotkey = hotkey;
    this.type = type;
    this.targets = targets;
  }
}
