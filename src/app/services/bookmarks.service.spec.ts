import { Bookmark } from './../main/bookmarks/bookmark';
import { TestBed } from '@angular/core/testing';

import { BookmarksService } from './bookmarks.service';
import { Image } from '../main/search/image';

describe('BookmarksService', () => {
  let service: BookmarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add bookmark correctly', () => {
    const bookmark: Bookmark = {
      image: {
        url: 'test',
        title: 'test'
      },
      tags: 'test'
    };
    service.addBookmark(bookmark);
    expect(service.getBookmarks()[0]).toEqual(bookmark);
  });

  it('should save bookmarks correctly', () => {
    const bookmark: Bookmark = {
      image: {
        url: 'test',
        title: 'test'
      },
      tags: 'test'
    };
    service.addBookmark(bookmark);
    service.saveBookmarks();
    const localStorageBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');

    expect(service.getBookmarks()).toEqual(localStorageBookmarks);
  })

  it('should load bookmarks correctly', () => {
    const bookmark: Bookmark = {
      image: {
        url: 'test',
        title: 'test'
      },
      tags: 'test'
    };
    service.addBookmark(bookmark);
    service.saveBookmarks();
    service.loadBookmarks();
    const localStorageBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');

    expect(service.getBookmarks()).toEqual(localStorageBookmarks);
  })

  it('should delete bookmark correctly', () => {
    const bookmark: Bookmark = {
      image: {
        url: 'test',
        title: 'test'
      },
      tags: 'test'
    };
    const bookmark2: Bookmark = {
      image: {
        url: 'test2',
        title: 'test2'
      },
      tags: 'test2'
    };
    service.addBookmark(bookmark);
    service.addBookmark(bookmark2);
    service.saveBookmarks();
    service.loadBookmarks();
    service.deleteBookmark(0);
    service.saveBookmarks();
    service.loadBookmarks();
    expect(service.getBookmarks()[1]).toBeUndefined();
  });

  it('should call delete function many times correctly', () => {
    service.deleteBookmark(0);
    service.deleteBookmark(0);
    service.deleteBookmark(0);
    service.deleteBookmark(0);
    service.deleteBookmark(0);
    service.deleteBookmark(0);
    expect(service.getBookmarks().length === 0).toBeTrue();
  });

  it('should call load function many times correctly', () => {
    const bookmark: Bookmark = {
      image: {
        url: 'test',
        title: 'test'
      },
      tags: 'test'
    };
    const bookmark2: Bookmark = {
      image: {
        url: 'test2',
        title: 'test2'
      },
      tags: 'test2'
    };
    service.addBookmark(bookmark);
    service.addBookmark(bookmark2);
    service.saveBookmarks();
    service.loadBookmarks();
    service.loadBookmarks();
    service.loadBookmarks();
    service.loadBookmarks();
    service.loadBookmarks();
    service.loadBookmarks();
    expect(service.getBookmarks().length === 2).toBeTrue();
  });
});
