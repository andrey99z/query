import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { query } from "ngx-react-query";
import { of, pluck, Subject } from "rxjs";
import { AppService, User } from "src/app/app.service";

@Component({
  selector: "url-params-example",
  template: `
    <div class="example-title">
      Query with params
      <a href="https://github.com/andrey99z/query/blob/main/examples/src/app/examples/url-params/user.component.ts" target="_blank">view code</a>
    </div>    
    <div *ngIf="user$ | async as user">
      <p *ngIf="user.data as data">
        Name: {{ data.name }}
      </p>
    </div>
    <div style="display: inline-flex; flex-direction: column;">
      <button (click)="refetch()">refetch</button>
      <a routerLink="..">Back to list</a>
      <a routerLink="../1">First</a>
      <a routerLink="../10">Last</a>
    </div>
  `
})
export class AdvancedQueryUserComponent {

  user$ = query<User>(['users', this.route.params.pipe(pluck('id'))], (id: string) => this.api.getUser(id));

  constructor(private route: ActivatedRoute, private api: AppService) { }

  refetch() {
    this.user$.refetch();
  }
  
}
