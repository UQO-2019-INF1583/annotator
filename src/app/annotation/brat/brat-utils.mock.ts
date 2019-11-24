import { DocumentData } from '../document-data';
import { Project } from '../../shared/project.model';
import { AnnotatedDocument } from '../../shared/annotated-document.model';
import { CollectionData } from '../collection-data';

export const docData = {
  annotDocData : {
    text: 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
    entities: [
      ['N1', 'Person', [[0, 2]]],
      ['N2', 'Person', [[5, 11]]]
    ],
    attributes: [
      ['A1', 'Notorious', 'N1']
    ],
    relations: [
      ['R1', 'Friend', [['From', 'N1'], ['To', 'N2']]]
    ],
    triggers: [
      ['T1', 'Greeting', [[3, 4]] ]
    ],
    events: [
      ['E1', 'T1', [['Greeter', 'N1'], ['Greeted', 'N2']]]
    ],
    comments: [
      ['N1', 'AnnotatorNotes', 'test comment']
    ],
    ctime: 1351154734.5055847,
    messages: [],
    modifications: [],
    normalizations: [],
    source_files: []
  }as DocumentData,
  doc1DocData : {
    text: 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
    entities: [
      ['N1', 'Person', [[0, 2]]],
      ['N2', 'Person', [[5, 11]]]
    ],
    attributes: [
      ['A1', 'Notorious', 'N1']
    ],
    relations: [
      ['R1', 'Friend', [['From', 'N1'], ['To', 'N2']]]
    ],
    triggers: [
      ['T1', 'Greeting', [[3, 4]] ]
    ],
    events: [
      ['E1', 'T1', [['Greeter', 'N1'], ['Greeted', 'N2']]]
    ],
    comments: [],
    ctime: 1351154734.5055847,
    messages: [],
    modifications: [],
    normalizations: [],
    source_files: []
  }as DocumentData
}

export const annotDoc = {
  doc1: {
    documentId: 'test1',
    title: 'test1',
    file: 'test1',
    text: 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
    projectId: 'test1',
    entities: [
      {
        id: 'N1',
        name: 'Person',
        locations: [
          {
            start: 0,
            end: 2
          }
        ],
        type: 'Person',
        labels: ['person'],
        bgColor: '#FE2E2E',
        borderColor: 'darken',
        unused: false,
        arcs: [],
        children: []
      },
      {
        id: 'N2',
        name: 'Person',
        locations: [
          {
            start: 5,
            end: 11
          }
        ],
        type: 'Person',
        labels: ['person'],
        bgColor: '#FE2E2E',
        borderColor: 'darken',
        unused: false,
        arcs: [],
        children: []
      }
    ],
    attributes: [
      {
        id: 'A1',
        name: 'testA',
        type: 'Notorious',
        labels: [],
        unused: false,
        values: {},
        target: 'N1'
      }
    ],
    relations: [
      {
        id: 'R1',
        type: 'Friend',
        from: {
          id: 'N1',
          role: 'From'
        },
        to: {
          id: 'N2',
          role: 'To'
        },
        labels: ['friend'],
        dashArray: '3,3',
        color: '',
        attributes: [],
        args: []
      }
    ],
    events: [
      {
        id: 'E1',
        locations: [
          {
            start: 3,
            end: 4
          }
        ],
        links: [
          {
            id: 'N1',
            type: 'Greeter'
          },
          {
            id: 'N2',
            type: 'Greeted'
          }
        ],
        triggerId: 'T1',
        name: 'Greeting',
        type: 'Greeting',
        labels: ['Greeting'],
        bgColor: '',
        borderColor: 'darken',
        attributes: [],
        children: [],
        unused: false,
        arcs: []
      }
    ]
  }as AnnotatedDocument,
  aDocInit: {
    documentId: 'test1',
    title: 'test1',
    file: 'test1',
    text: 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
    projectId: 'test1',
    entities: [],
    attributes: [],
    relations: [],
    events: []
  }as AnnotatedDocument
}

export const project = {
  proj1: {
    id: 'test1',
    title: 'test1',
    description: 'test1',
    admin: [],
    annotators: [],
    corpus: [],
    entities: [
      {
        name: 'Person',
        type: 'Person',
        labels: ['person'],
        bgColor: '#FE2E2E',
        borderColor: 'darken',
        unused: false,
        arcs: [],
        children: []
      }
    ],
    attributes: [
      {
        name: 'testA',
        type: 'Notorious',
        labels: [],
        unused: false,
        values: {}
      }
    ],
    events: [
      {
        name: 'Greeting',
        type: 'Greeting',
        labels: ['Greeting'],
        bgColor: '',
        borderColor: 'darken',
        attributes: [],
        children: [],
        unused: false,
        arcs: []
      }
    ],
    relations: [
      {
        type: 'Friend',
        labels: ['friend'],
        dashArray: '3,3',
        color: '',
        attributes: [],
        args: []
      }
    ]
  }as Project
}

export const colData = {
  stdColData : {
    items: [],
    messages: [],
    search_config: [
      ['Google', 'http://www.google.com/search?q=%s'],
      ['Wikipedia', 'http://en.wikipedia.org/wiki/Special:Search?search=%s'],
      ['UniProt', 'http://www.uniprot.org/uniprot/?sort=score&query=%s'],
      ['EntrezGene', 'http://www.ncbi.nlm.nih.gov/gene?term=%s'],
      ['GeneOntology', 'http://amigo.geneontology.org/cgi-bin/amigo/search.cgi?search_query=%s&action=new-search&search_constraint=term'],
      ['ALC', 'http://eow.alc.co.jp/%s']
    ],
    disambiguator_config: [],
    unconfigured_types: [],
    ui_names: {
      entities: 'entités',
      events: 'événements',
      relations: 'relations',
      attributes: 'attributs'
    },
    entity_types: [
      {
        name: 'Person',
        type: 'Person',
        labels: ['person'],
        bgColor: '#FE2E2E',
        borderColor: 'darken',
        unused: false,
        attributes: [],
        children: [],
        arcs: []
      }
    ],
    event_types: [
      {
        name: 'Greeting',
        type: 'Greeting',
        labels: ['Greeting'],
        bgColor: '',
        borderColor: 'darken',
        attributes: [],
        children: [],
        unused: false,
        arcs: []
      }
    ],
    relation_types: [
      {
        type: 'Friend',
        labels: ['friend'],
        dashArray: '3,3',
        color: '',
        args: []
      }
    ],
    entity_attribute_types: [
      {
        name: 'testA',
        type: 'Notorious',
        labels: [],
        unused: false,
        values: {}
      }
    ],
    event_attribute_types: [],
    relation_attribute_types: []
  }as CollectionData
}
