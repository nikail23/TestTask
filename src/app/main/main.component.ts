import { Component, OnInit } from '@angular/core';
import { pages, searchPageName, bookmarksPageName } from './pages';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public readonly pages = pages;
  public readonly searchPageName = searchPageName;
  public readonly bookmarksPageName = bookmarksPageName;

  public selectedPage = searchPageName;

  public searchPhrase = "";

  constructor() {
    console.log('!')
  }

  ngOnInit(): void {
  }

  public onSelectedPageChanges(page: string) {
    this.selectedPage = page;
  }

}
