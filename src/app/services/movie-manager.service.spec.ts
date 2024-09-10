import { TestBed } from '@angular/core/testing';

import { MovieManagerService } from './movie-manager.service';

describe('MovieManagerService', () => {
  let service: MovieManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
