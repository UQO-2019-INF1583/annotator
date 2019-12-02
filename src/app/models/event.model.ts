import { Arc } from "./arc.model";
import { ProjectService} from "../services/project/project.service";

export class Event {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor: string;
  attributes: string[];
  children: any[];
  unused: boolean;
  arcs: Arc[];

  constructor(
    name: string = "",
    type: string = "",
    labels: string[] = [""],
    attributes: string[] = [],
    children: Event[] = [],
    unused: boolean = false,
    arcs: Arc[] = [new Arc()]
  ) {

    let colors = ProjectService.getRandomLightAndDarkColor();

    this.name = name;
    this.type = type;
    this.labels = labels;
    this.bgColor = colors.light;
    this.borderColor = colors.dark
    this.attributes = attributes;
    this.children = children;
    this.unused = unused;
    this.arcs = arcs;
  }
}
