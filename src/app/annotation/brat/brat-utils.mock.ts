import {
  DocumentData,
  rawRelation,
  rawEventLink,
  rawAttribute,
  rawEntity
} from '../document-data';
import { Project } from '../../shared/project.model';
import { CollectionData } from '../collection-data';
import {
  AnnotatedDocument,
  EntityAnnotationUtils,
  AttributeAnnotationUtils,
  RelationAnnotationUtils,
  EventAnnotationUtils,
  EventLinkUtils,
  EntityAnnotation,
  AttributeAnnotation,
  RelationAnnotation,
  EventAnnotation,
  EventLink
} from '../../shared/annotated-document.model';

export const docData = {
  valid1 : {
    messages: [],
    source_files: ['ann', 'text'],
    modifications: [],
    normalizations: [],
    ctime: 1351154734.5055847,
    text: 'Ed O\'Kelley was the man who shot the man who shot Jesse James.\nJ\'ai castor le plus petit, mais le plus fort.',
    entities: [
      ['N1', 'Person', [[0, 2], [5, 11]]],
    ['N2', 'Person', [[20, 55], [55, 90], [90, 124]]],
    ['N3', 'Person', [[37, 40]]],
    ['N4', 'Object', [[78, 83], [84, 93]]],
    ['N5', 'Person', [[98, 104]]],
    ['N6', 'Person', [[105, 111]]],
    ['N7', 'Person', [[115, 120]]],
    ['N8', 'Person', [[50, 61]]]
    ],
    attributes: [
      ['A1', 'Notorious', 'N4'],
      ['A2', 'Polarity', 'N1', 'Positive'],
      ['A3', 'Polarity', 'N2', 'Negative'],
      ['A4', 'Epic', 'T1'],
      ['A5', 'Safe', 'R1']
    ],
    relations: [
      ['R1', 'Friend', [['From', 'N2'], ['To', 'N1']]]
    ],
    triggers: [
      ['T1', 'Assassination', [[45, 49]]],
      ['T2', 'Resurrection', [[28, 32]]],
      ['T3', 'Bomb', [[78, 93]]]
    ],
    events: [
      ['E1', 'T1', [['Perpetrator', 'N3'], ['Victim', 'N8']]],
      ['E2', 'T2', [['Savior', 'N2'], ['Resurrected', 'N3']]],
      ['E3', 'T3', [['Destroyed', 'N5'], ['Destroyed', 'N6'], ['Destroyed', 'N7']]]
    ],
    comments: [
      ['N1', 'AnnotatorNotes', 'test comment']
    ]
  } as DocumentData
}

export const annotDoc = {
  doc1: {
    documentId: 'test1',
    title: 'test1',
    file: 'test1',
    projectId: 'testP1',
    entities: [],
    attributes: [],
    relations: [],
    events: []
  }as AnnotatedDocument,
  doc2: {
    documentId: 'test2',
    title: 'test2',
    file: 'test2',
    projectId: 'testP1',
    entities: [],
    attributes: [],
    relations: [],
    events: []
  }as AnnotatedDocument
}

export const project = {
  id: 'test3',
  title: 'test3',
  description: 'test3',
  admin: [],
  annotators: [],
  corpus: [],
  entities: [],
  attributes: [],
  events: [],
  relations: []
} as Project
