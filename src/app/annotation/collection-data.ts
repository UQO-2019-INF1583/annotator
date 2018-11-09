export interface CollectionData {
  messages: string[];
  entity_types: IEntity[];
  event_type: IEvent[];
  relation_types: IRelation;
  search_config: string[];
  disambiguator_config: any[];
  unconfigured_types: any[];
  items: any[];
  ui_names: IUIName;
}

interface IUsable {
  used: boolean;
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

const collData = {
  event_attribute_types: [
    {
      labels: null,
      type: 'Confidence',
      name: 'Confidence',
      unused: false,
      values: {
        Certain: {
          dashArray: ','
        },
        Likely: {
          dashArray: '3,3'
        },
        Possible: {
          dashArray: '3,6'
        }
      }
    },
    {
      labels: null,
      type: 'BombType',
      name: 'BombType',
      unused: false,
      values: {
        'Nuclear bomb': {},
        'Neutron bomb': {},
        'Napalm bomb': {},
        'Hydrogen bomb': {}
      }
    },
    {
      name: 'Epic',
      type: 'Epic',
      values: { Epic: { glyph: '★★★' } }
    }
  ],
  entity_attribute_types: [
    {
      name: 'Notorious',
      type: 'Notorious',
      values: { Notorious: { glyph: '★' } }
    },
    {
      type: 'Polarity',
      name: 'Polarity',
      values: {
        Positive: {
          box: 'none',
          glyph: '\n[Polarity:true]',
          dashArray: '1,2'
        },
        Negative: {
          box: 'crossed',
          glyph: '\n[Polarity:false]',
          dashArray: '3,4'
        }
      }
    }
  ],
  relation_attribute_types: [
    {
      labels: null,
      type: 'RelConfidence',
      name: 'Relation Confidence',
      unused: false,
      values: {
        Certain: {
          dashArray: ','
        },
        Likely: {
          dashArray: '3,3'
        },
        Possible: {
          dashArray: '3,6'
        }
      }
    },
    {
      name: 'Safe',
      type: 'Safe',
      values: { Safe: {} }
    }
  ]
};
