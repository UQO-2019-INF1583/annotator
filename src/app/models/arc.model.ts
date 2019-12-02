import { ProjectService} from "../services/project/project.service";

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
    labels: string[] = [""],
    dashArray: string = "",
    hotkey: string = "",
    type: string = "",
    targets: string[] = []
  ) {

    let color = ProjectService.getRandomLightAndDarkColor();

    this.arrowHead = arrowHead;
    this.color = color.light;
    this.labels = labels;
    this.dashArray = dashArray;
    this.hotkey = hotkey;
    this.type = type;
    this.targets = targets;
  }
}
