import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddCorpusComponent } from "./add-corpus.component";
import { FormsModule } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatInputModule,
  MatDialogModule,
  MatProgressBarModule
} from "@angular/material";
import {
  NgxFileDropModule,
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from "ngx-file-drop";

describe("AddCorpusComponent", () => {
  let component: AddCorpusComponent;
  let fixture: ComponentFixture<AddCorpusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgxFileDropModule,
        MatInputModule,
        MatDialogModule,
        MatProgressBarModule,
        BrowserAnimationsModule
      ],
      declarations: [AddCorpusComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { corpusTitle: undefined, corpusFile: undefined }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("drop file", () => {
    component.fileDropped(mockFile);
    expect(component.data.corpusFile).toEqual(jasmine.objectContaining(file));
  });
});

// Mock data
const mockFile: NgxFileDropEntry[] = [
  {
    relativePath: "endo-1.txt",
    fileEntry: {
      isDirectory: false,
      isFile: true,
      name: "endo-1",
      file: (callback: (files: File) => void) => {
        callback(file);
        return file;
      }
    } as FileSystemFileEntry
  }
];

const file: File = {
  lastModified: 1572726788132,
  name: "travail2.txt",
  size: 158,
  type: "text/plain",
  slice: null
};
