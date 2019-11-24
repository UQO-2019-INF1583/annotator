import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
/* cette methode vérifie que chaque module respecte les normes avant d'être testé */
describe('FilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterService = TestBed.get(FilterService);
    expect(service).toBeTruthy(); / on s'assure que le resultat obtenu correspond bien au resultat de l'objet créé */
  });
});
