import { SearchState } from './state';
import { StateService } from '../../services/state.service';
import { FlickrPhoto } from './../../services/flickrTypes';
import { FlickrService } from './../../services/flickr.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public state: SearchState = {
    keyword: '',
    images: [],
    total: 0,
    perPage: 10,
    currPage: 1,
    isLoading: false
  };

  constructor(private flickr: FlickrService, private main: StateService) { }

  ngOnDestroy(): void {
    this.main.searchState$.next(this.state);
  }

  ngOnInit(): void {
    this.state = this.main.searchState$.getValue() || {};
  }

  public pageChanges(event: any) {
    this.state.perPage = event.pageSize;
    this.state.currPage = event.pageIndex + 1;
    this.search();
  }

  private mapPhotos(photos: FlickrPhoto[]) {
    const mappedPhotos = photos.map(photo => {
      const photoObj = {
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
        title: photo.title
      };
      return photoObj;
    });
    return mappedPhotos;
  }

  public searchEvent(event: any) {
    this.state.keyword = event.target.value.toLowerCase();
    this.search();
  }

  public search() {
    this.state.isLoading = true;
    if (this.state.keyword && this.state.keyword.length > 0) {
      this.flickr.search(this.state.keyword, this.state.perPage, this.state.currPage)
      .toPromise()
      .then(res => {
        this.state.images = this.mapPhotos(res.photos.photo);
        this.state.total = res.photos.total;
        this.state.isLoading = false;
      });
    }
  }
}
