import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { BookmarksService } from './../../services/bookmarks.service';
import { SearchState } from './searchState';
import { StateService } from '../../services/state.service';
import { FlickrPhoto, FlickrOutput } from './../../services/flickrTypes';
import { FlickrService } from './../../services/flickr.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from './image';
import { Bookmark } from '../bookmarks/bookmark';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private flickrService: FlickrService,
    private stateService: StateService,
    private bookmarksService: BookmarksService,
    public addBookmarkDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.stateService.saveState(this.state);
    this.bookmarksService.saveBookmarks();
  }

  ngOnInit(): void {
    this.state = this.stateService.getState();
    this.bookmarksService.loadBookmarks();
  }

  private bookmarkImage(id: number, tags: string): void {
    const image: Image = this.state.images[id];
    if (image) {
      const bookmark: Bookmark = {
        image: image,
        tags: tags,
      }
      this.bookmarksService.addBookmark(bookmark);
    }
  }

  public openAddBookmarkDialog(id: number) {
    const dialogRef = this.addBookmarkDialog.open(AddBookmarkComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result.state) {
        this.bookmarkImage(id, result.tags);
      }
    });
  }

  public pageChanges(event: any): void {
    this.state.perPage = event.pageSize;
    this.state.currPage = event.pageIndex + 1;
    this.search();
  }

  private mapPhotos(photos: FlickrPhoto[]): Image[] {
    const mappedImages = photos.map(photo => {
      const mappedImage: Image = {
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
        title: photo.title
      };
      return mappedImage;
    });
    return mappedImages;
  }

  private clearState(state: SearchState): void {
    state = {
      keyword: this.state.keyword,
      images: [],
      total: 0,
      perPage: 10,
      currPage: 1,
      isLoading: false,
      isEmpty: true
    }
  }

  private fillState(state: SearchState, result: FlickrOutput): void {
    state.images = this.mapPhotos(result.photos.photo);
    state.total = result.photos.total;
    state.isLoading = false;
  }

  public searchEvent(event: any): void {
    this.state.keyword = event.target.value.toLowerCase();
    this.search();
  }

  public search(): void {
    this.state.isLoading = true;
    this.state.isEmpty = false;
    if (this.state.keyword && this.state.keyword.length > 0) {
      this.flickrService.search(this.state.keyword, this.state.perPage, this.state.currPage)
      .toPromise()
      .then(result => {
        this.fillState(this.state, result);
        if (this.state.images.length === 0) {
          this.clearState(this.state);
        }
      });
    } else {
      this.clearState(this.state);
    }
  }
}
