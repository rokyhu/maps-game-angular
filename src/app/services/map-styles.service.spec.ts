import { TestBed } from '@angular/core/testing';

import { MapStylesService } from './map-styles.service';

describe('MapStylesService', () => {
  let service: MapStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
