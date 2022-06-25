import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "multiple-observers-example",
  template: `
      <div class="example-title">
        Multiple observers
        <a href="https://github.com/andrey99z/query/blob/main/examples/src/app/examples/multiple-observers/example.component.ts" target="_blank">view code</a>
      </div>
      <ng-container *ngFor="let _ of [].constructor(count)">
        <ul *ngIf="users$ | async as users">
          <li *ngFor="let user of users.data">
            {{ user.name }}
          </li>
        </ul>
      </ng-container>
      <div class="btns">
        <button (click)="add()">+</button>
        <button (click)="remove()" [disabled]="count === 0">-</button>
        <button (click)="refetch()">refetch</button>
      </div>
  `
})
export class MultipleObserversComponent {
  count = 1;
  users$ = query<User[]>(['users'], () => this.api.getUsers());

  constructor(private api: AppService) { }

  add() {
    this.count++;
  }

  remove() {
    this.count--;
  }

  refetch() {
    this.users$.refetch();
  }
}
