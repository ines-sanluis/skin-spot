import { TestBed } from '@angular/core/testing';

import { Ph2ApiService } from './ph2-api.service';

describe('Ph2ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ph2ApiService = TestBed.get(Ph2ApiService);
    expect(service).toBeTruthy();
  });
});
