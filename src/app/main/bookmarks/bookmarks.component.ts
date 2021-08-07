import { BookmarksService } from './../../services/bookmarks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  public bookmarks: any[] = [];

  public isEmpty: boolean = false;

  constructor(private bookmarksService: BookmarksService) { }

  ngOnDestroy(): void {
    this.bookmarksService.saveBookmarks();
  }

  ngOnInit(): void {
    this.bookmarksService.loadBookmarks();
    this.bookmarks = this.bookmarksService.getBookmarks();
  }

  public deleteBookmark(id: number) {
    this.bookmarksService.deleteBookmark(id);
  }

}
