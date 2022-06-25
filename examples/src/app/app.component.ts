import { Component, OnInit } from "@angular/core";
import { queryClient } from "ngx-react-query";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    queryClient.setDefaultOptions({
      queries: {
        retry: false
      },
    })
  }
}
