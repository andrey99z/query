import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BasicQueryUsersComponent } from "./examples/basic-query/users.component";
import { DebugComponent } from "./components/debug/debug.component";
import { InfoComponent } from "./components/info/info.component";
import { AdvancedQueryUsersComponent } from "./examples/advanced-query/users.component";
import { AdvancedQueryUserComponent } from "./examples/advanced-query/user.component";

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
        path: 'advanced',        
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
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    InfoComponent,
    BasicQueryUsersComponent,
    AdvancedQueryUsersComponent,
    AdvancedQueryUserComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
