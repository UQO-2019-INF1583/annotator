// Format de données MOCK pour les catégories
import { Entity } from '../shared/entity.model';

export const MOCK_ENTITIES = [
  { bgColor: '#4CAF50', name: 'Regulier', type: 'vocabulary', labels: [] },
  { bgColor: '#FFEB3B', name: 'Nom avec espaces', type: 'vocabulary', labels: [] },
  { bgColor: '#673AB7', name: 'Nom avec Charactères "&!(/! spéciaux', type: 'vocabulary', labels: [] },
  { bgColor: '#673AB7', name: 'Nom avec charactères escaped \'', type: 'vocabulary', labels: [] },
];

export const ENTITIES: Entity[] = [
  new Entity('Sentence', 'vocabulary', [], 'green'),
  new Entity('AnatomicalSiteMention', 'medical', [], 'yellow'),
  new Entity('SignSymptomMention', 'medical', [], 'blue')
];
