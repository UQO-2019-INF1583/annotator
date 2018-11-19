
import { BratUtils } from './brat-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionData } from '../collection-data';
import {
  docData,
  colData,
  project,
  annotDoc
} from './brat-utils.mock';
import { Project } from '../../shared/project.model';
import { AnnotatedDocument } from '../../shared/annotated-document.model';



describe('bratUtils', () => {
  let bratUtil:  BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({
    }).compileComponents();
  });

  it('should create docData', () => {
          expect(BratUtils.getDocDataFromAnnotatedDocument(annotDoc.doc1)).toBe(docData.docRes1);
  });

  it('should create colData', () => {
    expect(BratUtils.getColDataFromProject(project.proj1)).toBe(colData.colRes1);
  });

  it('should create annotatedDocument', () => {
    expect(BratUtils.getColDataFromProject(project.proj1)).toBe(colData.colRes1);
  });
});
