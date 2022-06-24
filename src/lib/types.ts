import { QueryFunctionContext, QueryKey, QueryObserverOptions, QueryObserverResult } from "react-query/core";
import { Observable } from "rxjs";

type UseBaseQueryResult<
  TData = unknown,
  TError = unknown
> = QueryObserverResult<TData, TError>;

export type UseQueryResult<
  TData = unknown,
  TError = unknown
> = UseBaseQueryResult<TData, TError>;

interface UseBaseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
  extends QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  > {}

export interface UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
  extends UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  > {}

export declare type QueryFunction<T = unknown, TQueryKey extends QueryKey = QueryKey> = 
  (...params: (any| QueryFunctionContext<TQueryKey>)[]) => T | Promise<T>;

export type ObservableEx<UseQueryResult> = Observable<UseQueryResult> & {
  getCache: () => any;
  refetch: () => void;
  getData: () => any;
};
