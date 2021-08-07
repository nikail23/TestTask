import { BookmarksService } from './../../services/bookmarks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from './bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  public bookmarks: Bookmark[] = [];

  public isEmpty: boolean = false;

  constructor(private bookmarksService: BookmarksService) { }

  ngOnDestroy(): void {
    this.bookmarksService.saveBookmarks();
  }

  ngOnInit(): void {
    this.bookmarksService.loadBookmarks();
    this.bookmarks = this.bookmarksService.getBookmarks();
    if (this.bookmarks.length === 0) {
      this.isEmpty = true;
    }
  }

  public deleteBookmark(id: number): void {
    this.bookmarksService.deleteBookmark(id);
  }

}
