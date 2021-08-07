import { Bookmark } from './../main/bookmarks/bookmark';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private bookmarks: Bookmark[] = [];

  constructor() { }

  public saveBookmarks(): void {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  public loadBookmarks(): void {
    const jsonBookmarks = localStorage.getItem('bookmarks');
    if (jsonBookmarks && jsonBookmarks.length > 0) {
      this.bookmarks = JSON.parse(jsonBookmarks);
    } else {
      this.bookmarks = [];
    }
  }

  public getBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  public addBookmark(bookmark: Bookmark): void {
    this.bookmarks.push(bookmark);
  }

  public deleteBookmark(id: number): void {
    this.bookmarks.splice(id, 1);
  }
}
