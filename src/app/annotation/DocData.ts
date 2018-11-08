export interface DocData {
  message: any[],
  source_file: string[],
  modifications: any[],
  normalizations: any[],
  ctime: any,
  text: string,
  entities: entities,
  attributes: attributes,
  relations: relations,
  triggers: triggers,
  events: events,
  comments: comments
}

type entities = [id, type, rangeTextSelection[]][];
type attributes = [id, type, target][];
type relations = [id, type, [relationArgs, relationArgs]][];
type triggers = [id, type, rangeTextSelection[]][];
type events = [id, trigger, [argType, argId][]][];
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
