
import { BratUtils } from './brat-utils';
import { TestBed } from '@angular/core/testing';
import { Project } from '../../shared/project.model';
import { AnnotatedDocument } from '../../shared/annotated-document.model';
import { docData } from './brat-data-mock';


describe('bratUtils', () => {
  let bratUtil:  BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({
    }).compileComponents();
  });
  it('should create component', () => {
    // expect(BratUtils.getDocDataFromAnnotatedDocument()).toBeDefined();
  });
});
