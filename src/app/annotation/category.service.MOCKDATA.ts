// Format de données MOCK pour les catégories
import { Entite } from '../shared/entite.model';

export const MOCK_CATEGORIES = [
  { bgColor: '#4CAF50', name: 'Regulier', type: 'vocabulary', labels: [] },
  { bgColor: '#FFEB3B', name: 'Nom avec espaces', type: 'vocabulary', labels: [] },
  { bgColor: '#673AB7', name: 'Nom avec Charactères "&!(/! spéciaux', type: 'vocabulary', labels: [] },
  { bgColor: '#673AB7', name: 'Nom avec charactères escaped \'', type: 'vocabulary', labels: [] },
];

export const CATEGORIES: Entite[] = [
  { name: 'Sentence', type: 'vocabulary', labels: [], bgColor: 'green' },
  { name: 'AnatomicalSiteMention', type: 'medical', labels: [], bgColor: 'yellow' },
  { name: 'SignSymptomMention', type: 'medical', labels: [], bgColor: 'blue' }
];
