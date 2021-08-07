import { environment } from './../../environments/environment';
import { FlickrOutput } from './flickrTypes';
import { TestBed } from '@angular/core/testing';
import { FlickrService } from './flickr.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('FlickrService', () => {
  let service: FlickrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: []
    });
    service = TestBed.inject(FlickrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search images correctly', (done: DoneFn) => {
      service.search('abc', 10, 1).subscribe(output => {
        expect(output.photos.photo.length === 10 && output.photos.total > 0).toBeTruthy();
        done();
      });
  });

  it('should not search unexisting images correctly', (done: DoneFn) => {
      service.search('aidjaifaifahfafsdsdvsdvsdvatskdmcaksciahaeifsa', 10, 1).subscribe(output => {
        expect(output.photos.photo.length === 0 && output.photos.total === 0).toBeTruthy();
        done();
      });
  });

  it('should work per page parameter correctly', (done: DoneFn) => {
      service.search('abc', 100, 1).subscribe((output: FlickrOutput) => {
        expect(output.photos.photo.length === 100 && output.photos.total > 0).toBeTruthy();
        done();
      });
  });

  it('should search empty names images corretly', (done: DoneFn) => {
      service.search('', 10, 1).subscribe((output: FlickrOutput) => {
        console.log(output)
        expect(output.photos.photo.length === 0 && output.photos.total === 0).toBeTruthy();
        done();
      })
  });
});
