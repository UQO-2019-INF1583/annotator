import { Arc } from './arc.model';

export class Event {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor: string;
  attributes: string[];
  children: Event[];
  unused: boolean;
  arcs: Arc[];

  constructor(name: string = '', type: string = '', labels: string[] = [], bgColor: string = ''
    , borderColor: string = 'darken', attributes: string[] = [], unused: boolean = false, arcs: Arc[] = [], children: Event[] = []) {
   this.name = name;
    this.type = type;
    this.labels = labels;
    this.bgColor = bgColor;
    this.borderColor = 'darken';
    this.attributes = attributes;
    this.children = children;
    this.unused = unused;
    this.arcs = arcs;
  }
}
