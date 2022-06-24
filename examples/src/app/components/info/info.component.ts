import { Component } from "@angular/core";
import { queryCache } from "ngx-react-query";
import { map } from "rxjs";

@Component({
  selector: "query-info",
  templateUrl: "./info.component.html",
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
    cache$ = queryCache.pipe(map((x: any) => x.cache));
}
