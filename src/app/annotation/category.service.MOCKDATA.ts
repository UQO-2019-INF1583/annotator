// Format de données MOCK pour les catégories
import { Category } from './Category';

export const MOCK_CATEGORIES = [
  { color: '#4CAF50', name: 'Regulier' },
  { color: '#FFEB3B', name: 'Nom avec espaces'},
  { color: '#673AB7', name: 'Nom avec Charactères "&!(/! spéciaux'},
  { color: '#673AB7', name: 'Nom avec charactères escaped \''},
];

export const CATEGORIES: Category[] = [
  { name: 'Sentence', color: 'green' },
  { name: 'AnatomicalSiteMention', color: 'yellow' },
  { name: 'SignSymptomMention', color: 'blue' }
];