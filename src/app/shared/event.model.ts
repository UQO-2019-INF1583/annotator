export class Event {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor: string;
  attributes: string[];
  children: any[];
  unused: boolean;
  arcs: any[];

  constructor() {
    this.name = '';
    this.type = '';
    this.labels = [];
    this.bgColor = '';
    this.borderColor = 'darken';
    this.attributes = [];
    this.children = [];
    this.unused = false;
    this.arcs = [];
  }
}
