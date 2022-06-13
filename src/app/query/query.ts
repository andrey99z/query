import {
  QueryClient,
  QueryObserver,
  notifyManager,
  DefaultOptions,
  QueryKey,
  QueryFunction
} from "react-query/core";
import { BehaviorSubject, combineLatest, defer, isObservable, of } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { UseQueryOptions, UseQueryResult, ObservableEx } from "./types";
import { parseQueryArgs } from "./utils";

const queryClient = new QueryClient();

export function setQueryOptions(options: DefaultOptions) {
  queryClient.setDefaultOptions(options);
}

export function query<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): ObservableEx<UseQueryResult<TData, TError>>;
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
): ObservableEx<UseQueryResult<TData, TError>>;
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
): ObservableEx<UseQueryResult<TData, TError>>;
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
): ObservableEx<UseQueryResult<TData, TError>> {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const queryKeysArray = Array.isArray(parsedOptions.queryKey)
    ? parsedOptions.queryKey
    : [parsedOptions.queryKey];
  const queryKeyObservableArray = queryKeysArray.map((x: any) =>
    isObservable(x) ? x : of(x)
  );

  const source$ = new BehaviorSubject<UseQueryResult<TData>>({
    status: "idle",
    data: undefined
  } as UseQueryResult<TData>);

  const deferred = defer(() => {
    let observer: any;
    let unsubscribe: any;
    const subscription = combineLatest(queryKeyObservableArray)
      .pipe(
        map((key, i) => {
          if (i === 0) {
            observer = new QueryObserver(
              queryClient,
              queryClient.defaultQueryObserverOptions({
                ...parsedOptions,
                queryKey: key as any
              })
            );
            unsubscribe = observer.subscribe(
              notifyManager.batchCalls((state: any) => {
                source$.next(state);
              })
            );
            observer.updateResult();
          }
          return key;
        })
      )
      .subscribe((key) => {
        observer.setOptions(
          queryClient.defaultQueryObserverOptions({
            ...parsedOptions,
            queryKey: key as any
          })
        );
      });

    return source$.pipe(
      finalize(() => {
        if (unsubscribe) unsubscribe();
        if (subscription) subscription.unsubscribe();
      })
    );
  }) as ObservableEx<UseQueryResult<TData, TError>>;

  deferred.getData = () => source$.value.data;
  deferred.getCache = () => queryClient.getQueryCache().getAll();
  deferred.refetch = () => source$.value.refetch();

  return deferred;
}
