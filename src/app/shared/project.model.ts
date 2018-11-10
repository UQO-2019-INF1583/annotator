// structure de données utilisée pour représenter un projet
import { Doc } from './document.model';
import { Entite } from './entite.model';
import { Event } from './event.model';
import { Attribute } from './attribute.model'
import { Relation } from './relation.model';
import { CollectionData } from '../annotation/collection-data';

export interface Project {
  id: string;
  title: string;
  description: string;
  admin: string[]; // user ids
  annotators: string[]; // user ids
  corpus: Doc[];
  entities: Entite[];
  attributes: Attribute[];
  events: Event[];
  relations: Relation[];
}

export class ProjectUtils {
  static generateEmpty(): Project {
    return {
      id: '',
      title: '',
      description: '',
      admin: [],
      annotators: [],
      corpus: [],
      entities: [],
      attributes: [],
      events: [],
      relations: []
    }
  }

  static toJSON(project: Project) {
    const collectionData: CollectionData = null;

    collectionData.messages = []

    collectionData.search_config = [
      ['Google', 'http://www.google.com/search?q=%s'],
      ['Wikipedia', 'http://en.wikipedia.org/wiki/Special:Search?search=%s'],
      ['UniProt', 'http://www.uniprot.org/uniprot/?sort=score&query=%s'],
      ['EntrezGene', 'http://www.ncbi.nlm.nih.gov/gene?term=%s'],
      ['GeneOntology', 'http://amigo.geneontology.org/cgi-bin/amigo/search.cgi?search_query=%s&action=new-search&search_constraint=term'],
      ['ALC', 'http://eow.alc.co.jp/%s']
    ];

    collectionData.disambiguator_config = [];

    collectionData.unconfigured_types = [];

    collectionData.ui_names = {
      entities: 'entités',
      events: 'événements',
      relations: 'relations',
      attributes: 'attributs'
    }

    collectionData.entity_types = project.entities.map(x => ({
      name: x.name,
      type: x.type,
      labels: x.labels,
      bgColor: x.bgColor,
      borderColor: 'darken',
      unused: false,
      // TODO: Fill
      attributes: [],
      // TODO: Fill
      arcs: [],
      // TODO: Fill
      children: []
    }));

    collectionData.event_type = project.events.map(x => ({
      name: x.name,
      type: x.type,
      labels: [x.type],
      bgColor: x.color,
      borderColor: 'darken',
      unused: false,
      // TODO: Fill
      attributes: [],
      // TODO: Fill
      children: [],
      // TODO: Fill
      arcs: []
    }));

    collectionData.relation_types = project.relations.map(x => ({
      type: x.type,
      labels: [x.type],
      // TODO: What is this?
      dashArray: '3,3',
      color: x.color,
      // TODO: Fill
      args: []
    }));

    collectionData.entity_attribute_types = project.attributes.map(x => ({
      name: x.name,
      type: x.type,
      labels: [x.type],
      // TODO: Is attribute "valeurs" field supposed to be mapped here?
      values: {
        [x.type]: {
          glyph: x.valeurs[0],
          // TODO: What is this?
          dashArray: '3,3',
          box: ''
        }
      },
      unused: false
    }));

    // TODO: Have something in project to represent this attribute
    collectionData.event_attribute_types = []

    // TODO: Have something in project to represent this attribute
    collectionData.relation_attribute_types = []

    return JSON.stringify(collectionData);
  }
}

