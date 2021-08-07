import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private bookmarks: any[] = [];

  constructor() { }

  public saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  public loadBookmarks() {
    const jsonBookmarks = localStorage.getItem('bookmarks');
    if (jsonBookmarks && jsonBookmarks.length > 0) {
      this.bookmarks = JSON.parse(jsonBookmarks);
    } else {
      this.bookmarks = [];
    }
  }

  public getBookmarks() {
    return this.bookmarks;
  }

  public addBookmark(bookmark: any) {
    this.bookmarks.push(bookmark);
  }

  public deleteBookmark(id: number) {
    this.bookmarks.splice(id, 1);
  }
}
