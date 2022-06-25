import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BasicQueryUsersComponent } from "./examples/basic-query/example.component";
import { LogComponent } from "./components/log/log.component";
import { InfoComponent } from "./components/info/info.component";
import { AdvancedQueryUsersComponent } from "./examples/url-params/users.component";
import { AdvancedQueryUserComponent } from "./examples/url-params/user.component";
import { MultipleObserversComponent } from "./examples/multiple-observers/example.component";
import { MasterDetailQueryComponent } from "./examples/master-detail-query/example.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'basic'
      },
      {
        path: 'basic',
        component: BasicQueryUsersComponent
      },
      {
        path: 'url-params',        
        children: [
          {
            path: '',
            component: AdvancedQueryUsersComponent,
          },
          {
            path: ':id',
            component: AdvancedQueryUserComponent,
          }
        ]
      },
      {
        path: 'multiple-observers',
        component: MultipleObserversComponent
      },
      {
        path: 'master-detail',
        component: MasterDetailQueryComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    InfoComponent,
    BasicQueryUsersComponent,
    AdvancedQueryUsersComponent,
    AdvancedQueryUserComponent,
    MultipleObserversComponent,
    MasterDetailQueryComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
