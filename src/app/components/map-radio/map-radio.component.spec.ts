import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRadioComponent } from './map-radio.component';

describe('MapRadioComponent', () => {
  let component: MapRadioComponent;
  let fixture: ComponentFixture<MapRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
