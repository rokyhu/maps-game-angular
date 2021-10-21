import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWarnComponent } from './dialog-warn.component';

describe('DialogWarnComponent', () => {
  let component: DialogWarnComponent;
  let fixture: ComponentFixture<DialogWarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWarnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
