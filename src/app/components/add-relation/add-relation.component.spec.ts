import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationComponent } from './add-relation.component';

describe('AddRelationComponent', () => {
  let component: AddRelationComponent;
  let fixture: ComponentFixture<AddRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddRelationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
