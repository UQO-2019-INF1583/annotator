
// tslint:disable-next-line:interface-over-type-literal
export type CollectionData = {
  messages: string[];
  entity_types: IEntity[];
  event_types: IEvent[];
  relation_types: IRelation[];
  search_config: string[][];
  disambiguator_config: any[];
  unconfigured_types: any[];
  items: any[];
  ui_names: IUIName;
  event_attribute_types: IAttribute[];
  entity_attribute_types: IAttribute[];
  relation_attribute_types: IAttribute[];
}

interface IUsable {
  unused: boolean;
}

interface IBase {
  name: string;
  type: string;
}

interface IUIName {
  entities: string;
  events: string;
  relations: string;
  attributes: string;
}

interface IEntity extends IChildren, IUsable {
  attributes: string[];
  arcs: IEntityArc[];
}

interface IChildren extends IBase {
  labels: string[];
  bgColor: string;
  borderColor: string;
  children: IChildren[];
}

interface IEntityArc {
  arrowHead: string;
  color: string;
  labels: string[];
  dashArray: string;
  hotkey: string;
  type: string;
  targets: string[];
}

interface IEventArc {
  type: string;
  labels: string[];
  targets: string[];
  color: string;
}

interface IEvent extends IUsable, IBase {
  labels: string[];
  bgColor: string;
  borderColor: string;
  attributes: string[];
  children: any[];
  arcs: IEventArc[];
}

interface IRelationArgument {
  role: string;
  targets: string[];
}

interface IRelation {
  type: string;
  labels: string[];
  dashArray: string;
  color: string;
  args: IRelationArgument[];
}

interface IAttribute extends IUsable, IBase {
  labels: string[];
  values: IAttributeValueList;

}

interface IAttributeValueList {
  [key: string]: IAttributeValue
}

interface IAttributeValue {
  dashArray: string;
  glyph: string;
  box: string;
}
