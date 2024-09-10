import { TestBed } from '@angular/core/testing';

import { HTTPOMDBService } from './httpomdb.service';

describe('HTTPOMDBService', () => {
  let service: HTTPOMDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPOMDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
