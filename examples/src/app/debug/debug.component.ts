import { Component, OnDestroy, OnInit } from "@angular/core";
import { queryCache } from "ngx-react-query";
import { Subscription } from "rxjs";

@Component({
  selector: "query-debug",
  templateUrl: "./debug.component.html",
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit, OnDestroy {
    subscription?: Subscription
    log: any[] = [];

    ngOnInit(): void {
        this.subscription = queryCache.subscribe((x: any) => {
            const item = {
                key: x.queryKey,
                status: x.state.status,
                fetchStatus: x.state.fetchStatus
            }
            this.log = [item, ...this.log];
        })
    }
    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
