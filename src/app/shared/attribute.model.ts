import { AttributeValue } from './attribute-value.model';

export class Attribute {
  name: string;
  type: string;
  labels: string[];
  unused: boolean;
  values: any;

  constructor(name: string = '', type: string = '', labels: string[] = [], unused: boolean = false,
    values: object = {}) {
    this.name = name;
    this.type = type;
    this.labels = labels;
    this.unused = unused;
    this.values = values;
  }
}
