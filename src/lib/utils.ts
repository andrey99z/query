import { QueryKey, QueryOptions } from "react-query/core";
import { QueryFunction } from "./types";

export function parseQueryArgs<
  TOptions extends QueryOptions<any, any, any, TQueryKey>,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: TQueryKey | TOptions,
  arg2?:  QueryFunction<any, TQueryKey>  | TOptions, 
  arg3?: TOptions
): TOptions {
  if (!isQueryKey(arg1)) {
    return {...arg1, queryFn: patchQueryFn(arg1.queryFn)} as TOptions;
  }

  if (typeof arg2 === "function") {
    return { ...arg3, queryKey: arg1, queryFn: patchQueryFn(arg2) } as TOptions;
  }

  return { ...arg2, queryFn: patchQueryFn(arg2?.queryFn), queryKey: arg1 } as TOptions;
}

const isQueryKey = (value: any): value is QueryKey => {
  return typeof value === "string" || Array.isArray(value);
}

const patchQueryFn = (fn: any) => {
  if (fn == null) return fn;
  return (context: any) => {
    const params = context.queryKey.slice(1);
    return fn(...params, context);
  }
}