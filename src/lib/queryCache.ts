import { notifyManager } from "react-query/core";
import { Subject } from "rxjs";
import { queryClient } from "./query";

const source$ = new Subject();

queryClient.getQueryCache().subscribe(notifyManager.batchCalls((state: any) => {
    if (state.type === 'updated') {
        source$.next(state.query);
    }
}));

export const queryCache = source$;