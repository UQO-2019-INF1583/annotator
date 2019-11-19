import { Project, ProjectUtils } from "../../../models/project.model";
import { Entity } from "../../../models/entity.model";

// data mocks
export const EntityTypesMock = {
  emptyProject: {
    id: "",
    title: "",
    description: "",
    state: 0,
    admin: [],
    annotators: [],
    corpus: [],
    entities: [],
    attributes: [],
    events: [],
    relations: []
  } as Project,

  validProject: {
    id: "",
    title: "Entity Testing",
    description: "Sample Project for Entity Testing",
    state: 1,

    entities: [
      {
        name: "Person",
        type: "Person",
        labels: ["Per", "P"],
        bgColor: "#FE2E2E",
        borderColor: "darken",
        unused: false,
        attributes: ["Notorious", "Polarity"],
        arcs: [
          {
            arrowHead: "triangle,5",
            color: "black",
            labels: ["Ennemy", "Enn"],
            dashArray: ",",
            hotkey: "T",
            type: "Ennemy",
            targets: ["Person"]
          },
          {
            arrowHead: "triangle,5",
            color: "black",
            labels: ["Friend", "Fr"],
            dashArray: ",",
            hotkey: "T",
            type: "Friend",
            targets: ["Person"]
          },
          {
            arrowHead: "triangle,5",
            color: "black",
            labels: ["Destruction", "Dest"],
            dashArray: ",",
            hotkey: "T",
            type: "Destruction",
            targets: ["Object", "Person"]
          }
        ],
        children: [
          {
            name: "Child",
            type: "Child",
            labels: ["Child", "Child"],
            bgColor: "#FE2E2E",
            borderColor: "darken",
            children: [
              {
                name: "Baby",
                type: "Baby",
                labels: ["Baby", "Baby"],
                bgColor: "#DF7401",
                borderColor: "darken",
                children: []
              },
              {
                name: "Kid",
                type: "Kid",
                labels: ["Kid", "Kid"],
                bgColor: "#FE2E2E",
                borderColor: "darken",
                children: []
              }
            ]
          }
        ]
      },
      {
        name: "Object",
        type: "Object",
        labels: ["Object", "Obj"],
        bgColor: "#7fa2ff",
        borderColor: "darken",
        attributes: [],
        children: [],
        unused: false,
        arcs: [
          {
            arrowHead: "triangle,5",
            color: "black",
            labels: ["Destruction", "Dest"],
            dashArray: ",",
            hotkey: "T",
            type: "Destruction",
            targets: ["Object", "Person"]
          }
        ]
      }
    ]
  } as Project
};
/*
const ennemy = {
  arrowHead: "triangle,5",
  color: "black",
  labels: ["Ennemy", "Enn"],
  dashArray: ",",
  hotkey: "T",
  type: "Ennemy",
  targets: ["Person"]
};

const friend = {
  arrowHead: "triangle,5",
  color: "black",
  labels: ["Friend", "Fr"],
  dashArray: ",",
  hotkey: "T",
  type: "Friend",
  targets: ["Person"]
};

const kid = {
  name: "Kid",
  type: "Kid",
  labels: ["Kid", "Kid"],
  bgColor: "#FE2E2E",
  borderColor: "darken",
  children: []
} as Entity;

const baby = {
  name: "Baby",
  type: "Baby",
  labels: ["Baby", "Baby"],
  bgColor: "#DF7401",
  borderColor: "darken",
  children: []
} as Entity;

const child = {
  name: "Baby",
  type: "Baby",
  labels: ["Baby", "Baby"],
  bgColor: "#DF7401",
  borderColor: "darken",
  children: [kid, baby]
} as Entity;

const destruction = {
  arrowHead: "triangle,5",
  color: "black",
  labels: ["Destruction", "Dest"],
  dashArray: ",",
  hotkey: "T",
  type: "Destruction",
  targets: ["Object", "Person"]
} as Arc;

const person = {
  name: "Person",
  type: "Person",
  labels: ["Per", "P"],
  bgColor: "#FE2E2E",
  borderColor: "darken",
  unused: false,
  attributes: ["Notorious", "Polarity"],
  arcs: [ennemy, friend, destruction],
  children: [child]
};

const objet = {
  name: "Object",
  type: "Object",
  labels: ["Object", "Obj"],
  bgColor: "#7fa2ff",
  borderColor: "darken",
  attributes: [],
  children: [],
  unused: false,
  arcs: [destruction]
};

// data mocks
export const EntityTypesMock = {
  emptyProject: {
    id: "",
    title: "",
    description: "",
    state: 0,
    admin: [],
    annotators: [],
    corpus: [],
    entities: [],
    attributes: [],
    events: [],
    relations: []
  } as Project,

  validProject: {
    id: "",
    title: "Entity Testing",
    description: "Sample Project for Entity Testing",
    state: 1,

    entities: [person, objet]
  } as Project
};
*/
