import { FlickrPhoto } from './../../services/flickrTypes';
import { FlickrService } from './../../services/flickr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private flickr: FlickrService) { }

  ngOnInit(): void {
  }

  public keyword = '';
  public images: any[] = [];
  public total: number = 0;
  public perPage: number = 10;
  public currPage: number = 1;
  public isLoading = false;

  public pageChanges(event: any) {
    this.perPage = event.pageSize;
    this.currPage = event.pageIndex + 1;
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
    this.isLoading = true;
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickr.search(this.keyword, this.perPage, this.currPage)
      .toPromise()
      .then(res => {
        this.images = this.mapPhotos(res.photos.photo);
        this.total = res.photos.total;
        this.isLoading = false;
      });
    }
  }

  public search() {
    this.isLoading = true;
    if (this.keyword && this.keyword.length > 0) {
      this.flickr.search(this.keyword, this.perPage, this.currPage)
      .toPromise()
      .then(res => {
        this.images = this.mapPhotos(res.photos.photo);
        this.total = res.photos.total;
        this.isLoading = false;
      });
    }
  }
}
