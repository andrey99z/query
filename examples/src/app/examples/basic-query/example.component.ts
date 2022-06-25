import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "basic-query-example",
  template: `
      <div class="example-title">
        Basic query
        <a href="https://github.com/andrey99z/query/blob/main/examples/src/app/examples/basic-query/example.component.ts" target="_blank">view code</a>
      </div>
      <div *ngIf="users$ | async as users">
        <div *ngIf="users.isLoading">Loading</div>
        <ul>
          <li *ngFor="let user of users.data">
            {{ user.name }}
          </li>
        </ul>
      </div>
      <button (click)="refetch()">refetch</button>
  `
})
export class BasicQueryUsersComponent {

  users$ = query<User[]>(['users'], () => this.api.getUsers());

  constructor(private api: AppService) { }

  refetch() {
    this.users$.refetch();
  }
}
