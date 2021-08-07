import { Image } from "./image";

export interface SearchState {
  keyword: string;
  images: Image[];
  total: number;
  perPage: number;
  currPage: number;
  isLoading: boolean;
  isEmpty: boolean;
}
