export interface SearchState {
  keyword: string;
  images: any[];
  total: number;
  perPage: number;
  currPage: number;
  isLoading: boolean;
}
