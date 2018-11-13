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
import {
  DocumentData,
  rawRelation,
  rawEventLink,
  rawAttribute,
  rawEntity,
  DocumentDataFirebase
} from '../document-data';
import { Project } from '../../shared/project.model';
import { CollectionData } from '../collection-data';

export class BratUtils {
  static getDocumentDataFirebaseFromAnnotatedDocument(annotatedDocument: AnnotatedDocument): DocumentDataFirebase {
    const docDataFirebase: DocumentDataFirebase = new DocumentDataFirebase();
    docDataFirebase.text = annotatedDocument.text;

    docDataFirebase.entities = annotatedDocument.entities.map(x => ({
      id: x.id,
      type: x.type,
      locations: x.locations.map(y => ({
        start: y.start,
        end: y.end
      }))
    }));

    docDataFirebase.attributes = annotatedDocument.attributes.map(x => ({
      id: x.id,
      type: x.type,
      target: x.target
    }));

    docDataFirebase.relations = annotatedDocument.relations.map(x => ({
      id: x.id,
      type: x.type,
      relations: {
        from: {
          argName: x.from.role,
          target: x.from.id
        },
        to: {
          argName: x.to.role,
          target: x.to.id
        }
      }
    }));

    docDataFirebase.triggers = [];

    annotatedDocument.events.forEach(event => {
      docDataFirebase.triggers.push({
        id: event.triggerId,
        type: event.type,
        locations: event.locations.map(y => ({
          start: y.start,
          end: y.end
        }))
      });

      docDataFirebase.events.push({
        id: event.id,
        trigger: event.triggerId,
        eventLinks: event.links.map(y => ({
          argType: y.type,
          argId: y.id
        }))
      });
    });

    docDataFirebase.comments = [];
    docDataFirebase.ctime = 1351154734.5055847;
    docDataFirebase.messages = [];
    docDataFirebase.modifications = [];
    docDataFirebase.normalizations = [];
    docDataFirebase.source_files = [];

    return docDataFirebase;
  }

  static getDocDataFromAnnotatedDocument(annotatedDocument: AnnotatedDocument): DocumentData {
    const docData: DocumentData = new DocumentData();
    docData.text = annotatedDocument.text;


    docData.entities = annotatedDocument.entities.map(entity => {
      const e: rawEntity = [entity.id, entity.type, entity.locations.map(x => ([x.start, x.end] as [number, number]))];
      return e;
    });

    docData.attributes = annotatedDocument.attributes.map(attribute => {
      const a: rawAttribute = [attribute.id, attribute.type, attribute.target];
      return a;
    });

    docData.relations = annotatedDocument.relations.map(relation => {
      const r: rawRelation = [
        relation.id,
        relation.type,
        [
          [relation.from.role, relation.from.id],
          [relation.to.role, relation.to.id]
        ]
      ];
      return r;
    });

    docData.triggers = [];
    annotatedDocument.events.forEach(event => {
      docData.triggers.push([event.triggerId, event.type, event.locations.map(x => ([x.start, x.end] as [number, number]))]);
      docData.events.push([
        event.id,
        event.triggerId,
        event.links.map(link => {
          const l: rawEventLink = [link.type, link.id];
          return l;
        })
      ]);
    });

    docData.comments = [];
    docData.ctime = 1351154734.5055847;
    docData.messages = [];
    docData.modifications = [];
    docData.normalizations = [];
    docData.source_files = [];

    return docData;
  }

  static getColDataFromProject(project: Project): CollectionData {
    const collectionData: CollectionData = new CollectionData();

    collectionData.items = [];
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

    collectionData.event_types = project.events.map(x => ({
      name: x.name,
      type: x.type,
      labels: x.labels,
      bgColor: x.bgColor,
      borderColor: 'darken',
      unused: false,
      attributes: [],
      children: [],
      arcs: []
    }));

    collectionData.relation_types = project.relations.map(x => ({
      type: x.type,
      labels: x.labels,
      dashArray: '3,3',
      color: x.color,
      args: [],
      attribute: []
    }));

    collectionData.entity_attribute_types = project.attributes.map(x => ({
      name: x.name,
      type: x.type,
      labels: x.labels,
      values: {},
      unused: false
    }));

    // TODO: Have something in project to represent this attribute
    collectionData.event_attribute_types = []

    // TODO: Have something in project to represent this attribute
    collectionData.relation_attribute_types = []

    return collectionData;
  }

  static fromDocumentDataFirebase(docData: DocumentDataFirebase, project: Project, annotatedDocument: AnnotatedDocument):
    AnnotatedDocument {
    annotatedDocument.entities = docData.entities.map(x => {
      const entity: EntityAnnotation = EntityAnnotationUtils.generateEmpty();
      const project_entity = project.entities.find(e => e.type === x.type)

      // Document entity
      entity.id = x.id;
      entity.locations = x.locations

      // Project entity
      entity.name = project_entity.name;
      entity.type = project_entity.type;
      entity.bgColor = project_entity.bgColor;
      entity.labels = project_entity.labels;

      return entity;
    });

    annotatedDocument.attributes = docData.attributes.map(x => {
      const attribute: AttributeAnnotation = AttributeAnnotationUtils.generateEmpty();
      const project_attribute = project.attributes.find(a => a.type === x.type)

      // Document attribute
      attribute.id = x.id;
      attribute.type = x.type;
      attribute.target = x.target;

      // Project attribute
      attribute.name = project_attribute.name;
      attribute.values = project_attribute.values;

      return attribute;
    });

    annotatedDocument.relations = docData.relations.map(x => {
      const relation: RelationAnnotation = RelationAnnotationUtils.generateEmpty();
      const project_relation = project.relations.find(r => r.type === x.type)

      // Document relation
      relation.id = x.id;
      relation.type = x.type;
      relation.from.id = x.relations.from.target;
      relation.from.role = x.relations.from.argName;
      relation.to.id = x.relations.to.target;
      relation.to.role = x.relations.to.argName;

      // Project relation
      relation.color = project_relation.color;
      relation.labels = project_relation.labels;
      relation.type = project_relation.type;

      return relation;
    });



    for (let i = 0; i < annotatedDocument.events.length; i++) {
      const docTrigger = docData.triggers[i];
      const docEvent = docData.events[i];
      const projectEvent = project.events.find(e => e.type === docTrigger.type)

      const event: EventAnnotation = EventAnnotationUtils.generateEmpty();
      // Project event
      event.labels = projectEvent.labels;
      event.type = docTrigger.type;
      event.bgColor = projectEvent.bgColor;
      event.attributes = projectEvent.attributes;
      event.name = projectEvent.name;
      event.locations = docTrigger.locations;

      // Document event
      event.triggerId = docEvent.trigger;
      event.id = docEvent.id;

      event.links = docEvent.eventLinks.map(y => {
        const link: EventLink = EventLinkUtils.generateEmpty();
        link.id = y.argId;
        link.type = y.argType;
        return link;
      });

      annotatedDocument.events.push(event);
    }

    return annotatedDocument;
  }
}
