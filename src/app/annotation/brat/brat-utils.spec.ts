
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

  it('should create a DocumentData', () => {
    expect(BratUtils.getDocDataFromAnnotatedDocument(annotDoc.doc1)).toEqual(docData.doc1DocData);
  });
});

describe ('getColDataFromProject', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });

  it('should create a CollectionData', () => {
    expect(BratUtils.getColDataFromProject(project.proj1)).toEqual(colData.stdColData);
  });
});

describe ('getAnnotatedDocumentfromDocData', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });

  it('should create an annotated document', () => {
    expect(BratUtils.getAnnotatedDocumentfromDocData(docData.annotDocData, project.proj1, annotDoc.aDocInit)).toEqual(annotDoc.doc1);
  });

});
describe('getLineNumbersfromDocument', () => {
  let bratUtil: BratUtils;

  beforeEach(() => {
    bratUtil = new BratUtils();
    TestBed.configureTestingModule({

    }).compileComponents();
  });
  it('should find element \'a\' and \'setnum\' in DOM ', () => {
    //on cherche l'élément a dans le DOM
    var element = document.getElementsByTagName('a');
    var element2 = document.getElementsByName('setnum');
    expect(element).toBeTruthy();
    expect(element2).toBeTruthy();
  })
  xit('should verify if its a URL', () => {
  })
});

