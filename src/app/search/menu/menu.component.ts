import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public readonly pages: string[] = ['Search', 'Bookmarks']

  public selectedPage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
