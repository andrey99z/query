import { AfterViewChecked, Component, ElementRef, OnInit } from "@angular/core";
import { queryClient } from "ngx-react-query";

@Component({
    selector: "query-log",
    templateUrl: "./log.component.html",
    styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewChecked {
    log: any[] = [];

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        queryClient.getQueryCache().subscribe((x: any) => {
            if (x.type !== 'observerResultsUpdated') {
                const item = {
                    key: x.query.queryKey,
                    type: x.type,
                    status: x.query.state.status,
                    fetching: x.query.state.isFetching
                }
                this.log = [...this.log, item];
            }
        });
    }

    ngAfterViewChecked() {
        const items = this.elementRef.nativeElement.getElementsByClassName('item');
        if (items && items.length > 0) {
            items[items.length - 1].scrollIntoView(false);
        }
    }

    clear() {
        this.log = [];
    }
}
