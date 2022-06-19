import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "./app.service";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html"
})
export class TestComponent {
  user_subject = new Subject();
  users$ = query<User[]>(['users'], () => this.api.getUsers());
  user$ = query<User>(['user', this.user_subject], ({ queryKey: [_, id] }) => {
    return this.api.getUser(id);
  });

  constructor(private api: AppService) {}

  loadUser(id: number) {
    this.user_subject.next(id);
  }

  getCache() {
    console.log(this.users$.getCache());
  }

  getData() {
    console.log(this.users$.getData());
  }

  refetch() {
    this.users$.refetch();
  }
}
