import { Component } from "@angular/core";
import { queryCache } from "ngx-react-query";

const theme = {
  background: '#0b1521',
  backgroundAlt: '#132337',
  foreground: 'white',
  gray: '#3f4e60',
  grayAlt: '#222e3e',
  inputBackgroundColor: '#fff',
  inputTextColor: '#000',
  success: '#00ab52',
  danger: '#ff0085',
  active: '#006bff',
  warning: '#ffb200',
} as const

@Component({
  selector: "query-info",
  templateUrl: "./info.component.html",
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  cache$ = queryCache;

  getQueryStatusLabel(query: any) {
    return query.state.isFetching
      ? 'fetching'
      : !query.getObserversCount()
        ? 'inactive'
        : query.isStale()
          ? 'stale'
          : 'fresh'
  }

  getQueryStatusColor(query: any) {
    return query.state.isFetching
      ? theme.active
      : !query.getObserversCount()
      ? theme.gray
      : query.isStale()
      ? theme.warning
      : theme.success
  }
}
