import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BasicQueryExampleComponent } from "./examples/basic-query/basic-query.component";
import { DebugComponent } from "./debug/debug.component";
import { InfoComponent } from "./info/info.component";
import { AdvancedQueryExampleComponent } from "./examples/advanced-query/advanced-query.component";

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
        component: BasicQueryExampleComponent
      },
      {
        path: 'advanced',
        component: AdvancedQueryExampleComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    InfoComponent,
    BasicQueryExampleComponent,
    AdvancedQueryExampleComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
