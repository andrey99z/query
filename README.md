# Ngx-react-query

[React-query](https://tanstack.com/query) for Angular.

Not maintained, please use [TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/overview) instead.

## Example

```ts
import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "basic-query-example",
  template: `
      <div class="example-title">
        Basic query
      </div>
      <ul *ngIf="users$ | async as users">
        <li *ngFor="let user of users.data">
          {{ user.name }}
        </li>
      </ul>
      <button (click)="refetch()">refetch</button>
  `
})
export class BasicQueryExampleComponent {

  users$ = query<User[]>(['users'], () => this.api.getUsers());

  constructor(private api: AppService) { }

  refetch() {
    this.users$.refetch();
  }
  
}
```

[More usage examples](https://andrey99z.github.io/query-examples)

## Installation
```
npm i ngx-react-query
```
No further configuration is required.
## Query
Query without parameters, returns an observable:
```ts
import { query } from "ngx-react-query";
...
users$ = query<User[]>(['users'], () => this.api.getUsers());
```
Query with observable parameters:
```ts
user$ = query<User>(['users', this.route.params.pipe(pluck('id'))], 
  (id: string) => this.api.getUser(id));
```
Refetching the query:
```ts
refetch() {
  this.user$.refetch();
}
```
## Default options
(optional) Overriding default options:
```ts
import { queryClient } from "ngx-react-query";
...
export class AppComponent implements OnInit {
  ngOnInit(): void {
    queryClient.setDefaultOptions({
      queries: {
        retry: false
      },
    })
  }
}
```

