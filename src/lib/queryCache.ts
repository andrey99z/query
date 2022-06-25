import { map } from "rxjs";
import { Subject } from "rxjs";
import { queryClient } from "./query";

const source$ = new Subject();

queryClient.getQueryCache().subscribe((event: any) => source$.next(event));

export const queryCache = source$.pipe(
    map((event: any) => event.query.cache)
);