import { TestBed } from '@angular/core/testing';

import { PhotogalleryService } from './photogallery.service';

describe('PhotogalleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotogalleryService = TestBed.get(PhotogalleryService);
    expect(service).toBeTruthy();
  });
});
