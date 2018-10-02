/**
 * Cette classe représente la structure de données correspondant à un type d'entité
 */
export class EntityType {
  name: string;
  type: string;
  labels: string[];
  bgColor: string;
  borderColor = 'darken';
  children: EntityType[];
  unused = false;
  attributes = [];
}
