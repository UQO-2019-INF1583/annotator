/**
 * Le model FilterBrat
 * @param filter Par quelle type de données filtrer
 * @param value L'élément sur lequel appliquer le filtre
 */
export class FilterBrat {
  filter: string;
  value: string;

  constructor() {
    this.filter = '';
    this.value = '';
  }
}
