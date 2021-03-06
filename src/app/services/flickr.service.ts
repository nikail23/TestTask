import { FlickrOutput, FlickrPhoto } from './flickrTypes';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private http: HttpClient) { }

  search(keyword: string, perPage: number, currPage: number) {
    if (keyword.length > 0) {
      const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
      const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=${perPage}&page=${currPage}`;

      return this.http.get<FlickrOutput>(url + params);
    } else {
      const emptyOutput: FlickrOutput = {
        photos: {
          photo: [],
          pages: 0,
          perPage: 0,
          total: 0
        }
      }
      return of(emptyOutput);
    }
  }
}
