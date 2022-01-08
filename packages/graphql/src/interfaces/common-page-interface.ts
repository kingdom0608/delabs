export interface IEdge<T> {
  cursor: string;
  node: T;
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface IClientFilter {
  startCursor: string;
  endCursor: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface ICommonPageWithSummary<T, S> {
  pageInfo: IPageInfo;
  totalCount: number;
  edges: IEdge<T>[];
  filterKey: string;
  summary?: S;
}

export interface ICommonPage<T> {
  pageInfo: IPageInfo;
  totalCount: number;
  count: number;
  edges: IEdge<T>[];
  filterKey: string;
}

export enum OrderByDirection {
  ASC,
  DESC
}

export interface OrderBy<F> {
  field: F;
  direction: keyof typeof OrderByDirection;
}

export interface QueryOptions<T, O extends OrderBy<T>> {
  first?: number;
  last?: number;
  before?: string;
  after?: string;
  orderBy?: O[];
}
