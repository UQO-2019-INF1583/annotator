import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoDialogBoxComponent } from './yes-no-dialog-box.component';

describe('YesNoDialogBoxComponent', () => {
  let component: YesNoDialogBoxComponent;
  let fixture: ComponentFixture<YesNoDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoDialogBoxComponent ]
    })
    .compileComponents();
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
