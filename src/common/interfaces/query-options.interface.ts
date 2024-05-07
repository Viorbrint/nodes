import { FilteringOptions } from './filtering-options.interface';
import { PaginationOptions } from './pagination-options.interface';
import { SearchingOptions } from './searching-options.interface';
import { SortingOptions } from './sorting-options.interface';

export interface QueryOptions {
  pagination: PaginationOptions;
  sorting?: SortingOptions;
  filtering?: FilteringOptions;
  searching?: SearchingOptions;
}
