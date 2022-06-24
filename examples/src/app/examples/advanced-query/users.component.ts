import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "advanced-query-example",
  template: `
    <div class="example-title">
      Advanced query
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
