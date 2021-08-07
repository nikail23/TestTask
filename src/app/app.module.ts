import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './main/menu/menu.component';
import { FormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './main/search/search.component';
import { BookmarksComponent } from './main/bookmarks/bookmarks.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBookmarkComponent } from './main/search/add-bookmark/add-bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent,
    MenuComponent,
    SearchComponent,
    BookmarksComponent,
    AddBookmarkComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
