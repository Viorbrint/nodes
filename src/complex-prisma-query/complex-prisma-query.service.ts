import { Injectable } from '@nestjs/common';
import { PaginationOptions } from './decorators/pagination-params.decorator';
import { SortingOptions } from './decorators/sorting-params.decorator';
import { FilteringOptions } from './decorators/filtering-params.decorator';
import { SearchingOptions } from './decorators/searching-params.decorator';

export interface QueryOptions {
  pagination: PaginationOptions;
  sorting: SortingOptions;
  filtering: FilteringOptions;
  searching: SearchingOptions;
}

@Injectable()
export class ComplexPrismaQueryService {
  constructor() {}

  async query(
    model,
    { pagination, sorting, filtering, searching }: QueryOptions,
    authorId: number = null,
  ) {
    const sort = sorting ? this.sortOptions(sorting) : {};
    const filter = filtering ? this.filterOptions(filtering) : {};
    const search = searching ? this.searchOptions(searching) : {};
    const author = authorId ? { authorId } : {};

    const prismaArgs = {
      orderBy: sort,
      where: {
        AND: [filter, search, author],
      },
    };

    const { page, limit } = pagination;
    const skip = limit * (page - 1);
    const [total, data] = await Promise.all([
      model.count(prismaArgs),
      model.findMany({ skip, take: limit, ...prismaArgs }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      pagination: {
        limit,
        total,
        page,
        totalPages,
        prevPage: page === 1 ? null : page - 1,
        nextPage: page === totalPages ? null : page + 1,
      },
      data,
    };
  }

  private searchOptions({ property, searchString }: SearchingOptions) {
    return {
      [property]: {
        contains: searchString,
        mode: 'insensitive',
      },
    };
  }

  private filterOptions({ property, rule, value }: FilteringOptions) {
    return {
      [property]: {
        [rule]: value,
      },
    };
  }

  private sortOptions({ property, direction }: SortingOptions) {
    return { [property]: direction };
  }
}
