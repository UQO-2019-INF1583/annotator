// Format de données MOCK pour les catégories
import { Entity } from "../shared/entity.model";
import { AnnotatedDocument } from "../shared/annotated-document.model";
import { Doc } from "../shared/document.model";

export const MOCK_ENTITIES = [
  { bgColor: "#4CAF50", name: "Regulier", type: "vocabulary", labels: [] },
  {
    bgColor: "#FFEB3B",
    name: "Nom avec espaces",
    type: "vocabulary",
    labels: []
  },
  {
    bgColor: "#673AB7",
    name: 'Nom avec Charactères "&!(/! spéciaux',
    type: "vocabulary",
    labels: []
  },
  {
    bgColor: "#673AB7",
    name: "Nom avec charactères escaped '",
    type: "vocabulary",
    labels: []
  }
];

export const ENTITIES: Entity[] = [
  new Entity("Sentence", "vocabulary", [], "green"),
  new Entity("AnatomicalSiteMention", "medical", [], "yellow"),
  new Entity("SignSymptomMention", "medical", [], "blue")
];
export const annotationDocument: AnnotatedDocument = {
  userId: "1234",
  etatDocument: 0,
  documentId: "4321",
  title: "titre test",
  file: "",
  text: "mon text de test",
  projectId: "projet10",
  entities: [],
  attributes: [],
  relations: [],
  events: []
};
export const document: Doc = {
  UserId: "1234",
  etatDocument: 0,
  documentId: "4321",
  title: "titre test",
  file: "",
  text: "mon text de test",
  projectId: "projet10"
};
