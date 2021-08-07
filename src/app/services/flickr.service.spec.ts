import { FlickrOutput } from './flickrTypes';
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

  it('should search images correctly', () => {
    (done: DoneFn) => {
      service.search('abc', 10, 1).subscribe(output => {
        expect(output.photos.photo.length === 10 && output.photos.total > 0).toBeTruthy();
        done();
      });
    }
  });

  it('should not search unexisting images correctly', () => {
    (done: DoneFn) => {
      service.search('aidjaifaifahfafsdsdvsdvsdvatskdmcaksciahaeifsa', 10, 1).subscribe(output => {
        expect(output.photos.photo.length === 0 && output.photos.total === 0).toBeTruthy();
        done();
      });
    }
  });

  it('should work per page parameter correctly', () => {
    (done: DoneFn) => {
      service.search('abc', 100, 1).subscribe(output => {
        expect(output.photos.photo.length === 100 && output.photos.total > 0).toBeTruthy();
        done();
      });
    }
  });

  it('should work page number parameter correctly', () => {
    (done: DoneFn) => {
      service.search('abc', 10, 1).subscribe(output1 => {
        service.search('abc', 10, 2).subscribe(output2 => {
          expect(output1.photos.photo[0].id !== output2.photos.photo[0].id).toBeTruthy();
          done();
        });
      });
    }
  });

  it('should search empty names images corretly', () => {
    (done: DoneFn) => {
      service.search('', 10, 1).subscribe(output => {
        expect(output.photos.photo.length === 10 && output.photos.total > 0).toBeTruthy();
        done();
      });
    }
  });
});
