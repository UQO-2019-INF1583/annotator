// tslint:disable-next-line:interface-over-type-literal
export type DocumentData = {
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
