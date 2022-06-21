import { Component } from "@angular/core";
import { query } from "ngx-react-query";
import { Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "advanced-query-example",
  templateUrl: "./advanced-query.component.html"
})
export class AdvancedQueryExampleComponent {

  users$ = query<User[]>(['users-advanced'], () => this.api.getUsers());

  constructor(private api: AppService) {}

  refetch() {
    this.users$.refetch();
  }
}
