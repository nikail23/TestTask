import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
