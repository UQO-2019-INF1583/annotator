import { Arc } from './arc.model';

export class Entity {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor: string;
  unused: boolean;
  arcs: Arc[];
  children: Entity[];

  constructor(name: string = '', type: string = '', labels: string[] = [], bgColor: string = ''
    , borderColor: string = 'darken', unused: boolean = false, arcs: Arc[] = [], children: Entity[] = []) {
    this.name = name;
    this.type = type;
    this.labels = labels;
    this.bgColor = bgColor;
    this.arcs = arcs;
    this.children = children;
    this.unused = unused;
    this.borderColor = borderColor;
  }
}
