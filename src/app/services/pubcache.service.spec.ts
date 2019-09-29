import { TestBed } from '@angular/core/testing';

import { PubcacheService } from './pubcache.service';

describe('PubcacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubcacheService = TestBed.get(PubcacheService);
    expect(service).toBeTruthy();
  });
});
