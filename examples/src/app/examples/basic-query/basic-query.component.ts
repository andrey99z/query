import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "basic-query-example",
  templateUrl: "./basic-query.component.html"
})
export class BasicQueryExampleComponent {

  users$ = query<User[]>(['users-basic'], () => this.api.getUsers());

  constructor(private api: AppService) {}

  refetch() {
    this.users$.refetch();
  }
}
