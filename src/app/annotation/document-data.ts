export class DocumentDataFirebase {
  messages: any[];
  source_files: string[];
  modifications: any[];
  normalizations: any[];
  ctime: any;
  text: string;
  entities: FirebaseEntity[];
  attributes: FirebaseAttribute[];
  relations: FirebaseRelation[];
  triggers: FirebaseTrigger[];
  events: FirebaseEvent[];
  comments: FirebaseComments[];
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseRelation = {
  id: id,
  type: type,
  relations: {
    from: FirebaseRelationArgs,
    to: FirebaseRelationArgs
  }
}

// tslint:disable-next-line:interface-over-type-literal
type FirebaseRelationArgs = {
  argName: argName,
  target: target
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseAttribute = {
  id: id,
  type: type,
  target: target
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseEntity = {
  id: id,
  type: type,
  locations: FireBaseRangeTextSelection[]
}

// tslint:disable-next-line:interface-over-type-literal
type FireBaseRangeTextSelection = {
  start: start,
  end: end
};

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseTrigger = {
  id: id,
  type: type,
  locations: FireBaseRangeTextSelection[]
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseEvent = {
  id: id,
  trigger: trigger,
  eventLinks: FirebaseEventLink[]
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseEventLink = {
  argType: argType,
  argId: argId
}

// tslint:disable-next-line:interface-over-type-literal
export type FirebaseComments = {
  id: id,
  type: type,
  string: string
}

export class DocumentData {
  messages: any[];
  source_files: string[];
  modifications: any[];
  normalizations: any[];
  ctime: any;
  text: string;
  entities: entities;
  attributes: attributes;
  relations: relations;
  triggers: triggers;
  events: events;
  comments: comments;
}

export type rawRelation = [id, type, [relationArgs, relationArgs]];
export type rawEventLink = [argType, argId];
export type rawAttribute = [id, type, target];
export type rawEntity = [id, type, rangeTextSelection[]];
type entities = rawEntity[];
type attributes = rawAttribute[];
type relations = rawRelation[];
type triggers = [id, type, rangeTextSelection[]][];
type events = [id, trigger, rawEventLink[]][];
type comments = [id, type, string][];

// Common
type id = string;
type target = id;
type type = string;

// Entities
type rangeTextSelection = [start, end];
type start = number;
type end = number;

// Relations
type argName = string;
type relationArgs = [argName, target];

// Events
type trigger = id;
type argType = string;
type argId = id;
