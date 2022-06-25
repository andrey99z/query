import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "url-params-example",
  template: `
    <div class="example-title">
      Query with params
      <a href="https://github.com/andrey99z/query/blob/main/examples/src/app/examples/url-params/users.component.ts" target="_blank">view code</a>
    </div>
    <ul *ngIf="users$ | async as users">
      <li *ngFor="let user of users.data">
        <a [routerLink]="user.id">{{ user.name }}</a>
      </li>
    </ul>
    <button (click)="refetch()">refetch</button>
  `
})
export class AdvancedQueryUsersComponent {

  users$ = query<User[]>(['users'], () => this.api.getUsers());

  constructor(private api: AppService) {}

  refetch() {
    this.users$.refetch();
  }

}
