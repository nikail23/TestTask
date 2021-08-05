import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'TestTask';
  readonly headerTitle = "Image Finder";
  readonly footerTitle = "Copyrights";
  readonly footerCopyrights = "Created by Yermolovich Ilya, 01.08.2021 as test task for Elinext";
}
