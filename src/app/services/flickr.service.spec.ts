
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  let service: FlickrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(FlickrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
