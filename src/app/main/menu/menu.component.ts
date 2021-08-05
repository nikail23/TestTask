import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() pages: string[] = [];

  @Output() selectedPageChange = new EventEmitter<string>();
  onSelectedPageChanged(page: string) {
    this.selectedPageChange.emit(page);
  }

  ngOnInit(): void {
  }

}
