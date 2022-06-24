# Ngx-react-query

[React-query](https://tanstack.com/query) for Angular.

🔰 This is work in progress, API likely to change, use at your own risk 🔰

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

## Query
Query without parameters, returns an observable:
```ts
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
## Help needed

All contributions welcome!
