// Liste temporaire des catégories d' Annotator.
import { Category } from '../shared/category.model';

export const CATEGORIES: Category[] = [
  { name: 'Sentence', type: 'vocabulary', labels: [], color: 'green' },
  { name: 'AnatomicalSiteMention', type: 'medical', labels: [], color: 'yellow' },
  { name: 'SignSymptomMention', type: 'medical', labels: [], color: 'blue' }
];
