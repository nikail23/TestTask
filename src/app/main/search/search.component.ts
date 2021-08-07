import { BookmarksService } from './../../services/bookmarks.service';
import { SearchState } from './searchState';
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
    isLoading: false,
    isEmpty: true
  };

  constructor(private flickrService: FlickrService, private stateService: StateService, private bookmarksService: BookmarksService) { }

  ngOnDestroy(): void {
    this.stateService.searchState$.next(this.state);
    this.bookmarksService.saveBookmarks();
  }

  ngOnInit(): void {
    this.state = this.stateService.searchState$.getValue() || {};
    this.bookmarksService.loadBookmarks();
  }

  public pageChanges(event: any) {
    this.state.perPage = event.pageSize;
    this.state.currPage = event.pageIndex + 1;
    this.search();
  }

  private mapPhotos(photos: FlickrPhoto[]) {
    const mappedPhotos = photos.map(photo => {
      const mappedPhoto = {
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
        title: photo.title
      };
      return mappedPhoto;
    });
    return mappedPhotos;
  }

  private clearState() {
    this.state = {
      keyword: this.state.keyword,
      images: [],
      total: 0,
      perPage: 10,
      currPage: 1,
      isLoading: false,
      isEmpty: true
    }
  }

  public searchEvent(event: any) {
    this.state.keyword = event.target.value.toLowerCase();
    this.search();
  }

  public search() {
    this.state.isLoading = true;
    this.state.isEmpty = false;
    if (this.state.keyword && this.state.keyword.length > 0) {
      this.flickrService.search(this.state.keyword, this.state.perPage, this.state.currPage)
      .toPromise()
      .then(res => {
        this.state.images = this.mapPhotos(res.photos.photo);
        this.state.total = res.photos.total;
        this.state.isLoading = false;
        if (this.state.images.length === 0) {
          this.clearState();
        }
      });
    } else {
      this.clearState();
    }
  }

  public bookmarkImage(id: number) {
    const image = this.state.images[id];
    if (image) {
      this.bookmarksService.addBookmark(image);
    }
  }
}
