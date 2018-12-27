import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { YesNoDialogBoxComponent } from './yes-no-dialog-box.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';


describe('YesNoDialogBoxComponent', () => {
  let component: YesNoDialogBoxComponent;
  let fixture: ComponentFixture<YesNoDialogBoxComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoDialogBoxComponent ],
      imports: [
        MatDialogModule
      ],
      providers : [
        { provide : MAT_DIALOG_DATA, useValue : {} },
        { provide : MatDialogRef, useValue : {} }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ YesNoDialogBoxComponent ],
        }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
