// Format de données MOCK pour les catégories
import { Entite } from '../shared/entite.model';

export const MOCK_CATEGORIES = [
  { color: '#4CAF50', name: 'Regulier', type: 'vocabulary', labels: [] },
  { color: '#FFEB3B', name: 'Nom avec espaces', type: 'vocabulary', labels: [] },
  { color: '#673AB7', name: 'Nom avec Charactères "&!(/! spéciaux', type: 'vocabulary', labels: [] },
  { color: '#673AB7', name: 'Nom avec charactères escaped \'', type: 'vocabulary', labels: [] },
];

export const CATEGORIES: Entite[] = [
  { name: 'Sentence', type: 'vocabulary', labels: [], color: 'green' },
  { name: 'AnatomicalSiteMention', type: 'medical', labels: [], color: 'yellow' },
  { name: 'SignSymptomMention', type: 'medical', labels: [], color: 'blue' }
];
