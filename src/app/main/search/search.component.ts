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

  public search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickr.search(this.keyword)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
  }

}
