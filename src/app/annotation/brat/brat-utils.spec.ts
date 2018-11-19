
import { BratUtils } from './brat-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionData } from '../collection-data';
import { DocumentData } from '../document-data';
import {
  docData,
  colData,
  project,
  annotDoc
} from './brat-utils.mock';
import { Project } from '../../shared/project.model';
import { AnnotatedDocument } from '../../shared/annotated-document.model';

describe ('getDocDataFromAnnotatedDocument', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });

  /*it('should create a docData', () => {
    expect(BratUtils.getDocDataFromAnnotatedDocument(annotDoc.doc1)).toEqual(jasmine.any(DocumentData))
  });*/

  it('should create a DocumentData', () => {
    expect(BratUtils.getDocDataFromAnnotatedDocument(annotDoc.doc1)).toBe(docData.stdDocData);
  });
});

describe ('getColDataFromProject', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });

  /*it('should create a colData', () => {
    expect(BratUtils.getColDataFromProject(project.proj1)).toEqual(jasmine.any(CollectionData))
  });*/

  it('should create a CollectionData', () => {
    expect(BratUtils.getColDataFromProject(project.proj1)).toBe(colData.stdColData);
  });
});

describe ('getAnnotatedDocumentfromDocData', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });

  /*it('should create a colData', () => {
    expect(BratUtils.getAnnotatedDocumentfromDocData(docData.expectedDocData,
     project.proj1, annotDoc.doc2)).toEqual(jasmine.any(AnnotatedDocument))
  });*/

  it('should create an annotated document', () => {
    expect(BratUtils.getAnnotatedDocumentfromDocData(docData.expectedDocData, project.proj1, annotDoc.aDocInit)).toBe(annotDoc.doc1);
  });
});

