import {
  QueryClient,
  QueryObserver,
  notifyManager,
  QueryKey
} from "react-query/core";
import { BehaviorSubject, combineLatest, defer, isObservable, of } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { UseQueryOptions, UseQueryResult, QueryFunction, QueryResult } from "./types";
import { parseQueryArgs } from "./utils";

export const queryClient = new QueryClient();

export function query<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): QueryResult<TData, TError>;
export function query<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey"
  >
): QueryResult<TData, TError>;
export function query<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
): QueryResult<TData, TError>;
export function query<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: TQueryKey | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, TQueryKey>
    | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): QueryResult<TData, TError> {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);

  // we want to allow query parameters to be observables
  // so that we can create new query when parameters change
  const queryKeysArray = Array.isArray(parsedOptions.queryKey)
    ? parsedOptions.queryKey
    : [parsedOptions.queryKey];
  const queryKeyObservableArray = queryKeysArray.map((x: any) =>
    isObservable(x) ? x : of(x)
  );

  // here we try to follow the logic in
  // https://github.com/TanStack/query/blob/beta/src/reactjs/useBaseQuery.ts

  // create internal source for our observable, starting off with 'idle'
  const source$ = new BehaviorSubject<UseQueryResult<TData, TError>>({
    status: "idle",
    data: undefined
  } as unknown as UseQueryResult<TData, TError>);

  // use 'deferred' to create a separate observable for each subscriber
  // this allows us to unsubscribe from QueryObserver
  // (QueryObserver has its own subscribers tracking mechanism)  
  const deferred = defer(() => {
    let observer: any;
    let unsubscribe: any;
    const subscription = combineLatest(queryKeyObservableArray)
      .pipe(
        map((key, i) => {
          if (i === 0) {
            // the following we need to do 
            // only on the first event emitted by our parameters observable

            // create QueryObserver
            observer = new QueryObserver(
              queryClient,
              queryClient.defaultQueryOptions({
                ...parsedOptions,
                queryKey: key as any
              })
            );

            // subscribe to notifyManager
            // it fires every time the query state changes
            // when it happens, we update the source
            unsubscribe = observer.subscribe(
              notifyManager.batchCalls((state: any) => {
                source$.next(state);
              })
            );

            // Update result to make sure we did not miss any query updates
            // between creating the observer and subscribing to it.
            observer.updateResult();
          }
          return key;
        })
      )
      .subscribe((key) => {
        // here we update observer options every time query params change
        observer.setOptions(
          queryClient.defaultQueryOptions({
            ...parsedOptions,
            queryKey: key as any
          })
        );
      });

    // return our observable
    return source$.pipe(
      finalize(() => {
        // once subscriber unsubscribes, we:
        // 1. unsubscribe from QueryObserver
        if (unsubscribe) unsubscribe();
        // 2. unsubscribe from parameters observable
        if (subscription) subscription.unsubscribe();
      })
    );
  }) as QueryResult<TData, TError>;

  deferred.getQuery = () => source$.value;
  deferred.getData = () => source$.value.data;
  deferred.refetch = () => source$.value.refetch();
  deferred.remove = () => source$.value.remove();

  return deferred;
}