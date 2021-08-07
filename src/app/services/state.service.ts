import { SearchState } from '../main/search/searchState';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  public searchState$ = new BehaviorSubject<SearchState>({
    keyword: '',
    images: [],
    total: 0,
    currPage: 1,
    perPage: 10,
    isLoading: false,
    isEmpty: true
  });
}
