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
export class BasicQueryUsersComponent {

  users$ = query<User[]>(['users'], () => this.api.getUsers());

  constructor(private api: AppService) { }

  refetch() {
    this.users$.refetch();
  }
}
