import { Component } from "@angular/core";
import { query, queryClient } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "master-detail-query-example",
  template: `
      <div class="example-title">
        Master-detail queries
        <a href="https://github.com/andrey99z/query/blob/main/examples/src/app/examples/master-detail-query/example.component.ts" target="_blank">view code</a>
      </div>
      <ul *ngIf="users$ | async as users">
        <li *ngFor="let user of users.data">
          <a href="javascript:void(0)" (click)="detail(user.id)">{{ user.name }}</a>
        </li>
      </ul>
      <div *ngIf="user$ | async as user">
        <p *ngIf="user.data as data">
          Name: {{ data.name }}
        </p>
      </div>
      <div class="btns">
        <button (click)="refetch()">refetch</button>
        <button (click)="refetchAll()">refetch all</button>
      </div>
  `
})
export class MasterDetailQueryComponent {
  userId = new Subject();

  users$ = query<User[]>(['users'], () => this.api.getUsers());
  user$ = query<User>(['users', this.userId], (id: string) => this.api.getUser(id));

  constructor(private api: AppService) { }

  detail(id: string) {
    this.userId.next(id);
  }

  refetch() {
    this.users$.refetch();
  }

  refetchAll() {
    queryClient.invalidateQueries('users')
  }
}
