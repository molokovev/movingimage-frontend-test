import { TestBed } from '@angular/core/testing';

import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
