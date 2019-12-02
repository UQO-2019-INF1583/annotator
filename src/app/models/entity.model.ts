import { Arc } from "./arc.model";
import { ProjectService} from "../services/project/project.service";

export class Entity {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor: string;
  unused: boolean;
  attributes: string[];
  arcs: Arc[];
  children: Entity[];

  constructor(
    name: string = "",
    type: string = "",
    labels: string[] = [""],
    unused: boolean = false,
    arcs: Arc[] = [],
    children: Entity[] = [],
    attributes: string[] = []
  ) {

    let colors = ProjectService.getRandomLightAndDarkColor();

    this.name = name;
    this.type = type;
    this.labels = labels;
    this.bgColor = colors.light;
    this.arcs = arcs;
    this.children = children;
    this.unused = unused;
    this.borderColor = colors.dark;
    this.attributes = attributes;
  }
}
