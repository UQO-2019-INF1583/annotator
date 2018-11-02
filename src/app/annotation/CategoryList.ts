// Liste temporaire des catégories d' Annotator.
import { Entite } from '../shared/entite.model';

export const CATEGORIES: Entite[] = [
  { name: 'Sentence', type: 'vocabulary', labels: [], bgColor: 'green' },
  { name: 'AnatomicalSiteMention', type: 'medical', labels: [], bgColor: 'yellow' },
  { name: 'SignSymptomMention', type: 'medical', labels: [], bgColor: 'blue' }
];
