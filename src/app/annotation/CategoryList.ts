// Liste temporaire des catégories d' Annotator.
import { Entite } from '../shared/entite.model';

export const CATEGORIES: Entite[] = [
  { name: 'Sentence', type: 'vocabulary', labels: [], color: 'green' },
  { name: 'AnatomicalSiteMention', type: 'medical', labels: [], color: 'yellow' },
  { name: 'SignSymptomMention', type: 'medical', labels: [], color: 'blue' }
];
