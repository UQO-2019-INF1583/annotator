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
    let corpusComponent: AddCorpusComponent;
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
        corpusComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(corpusComponent).toBeTruthy();
    });

    it("title change", () => {
        corpusComponent.filesSize = 4;
        var value = "name1,name2,name3,name4";
        var mockArray = [null, null, null, null];
        corpusComponent.data.corpusFile = mockArray;
        corpusComponent.onChange(value);
        expect(corpusComponent.notEnoughtArgument).toBeFalsy();
    });
});