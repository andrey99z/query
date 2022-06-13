import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface User {
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  getUsers() {
    console.log("API: Users");
    return this.http
      .get<User[]>("https://6145601e38339400175fc5b9.mockapi.io/users")
      .toPromise();
  }

  getUser(id: number) {
    console.log("API: User", id);
    return this.http
      .get<User>(`https://6145601e38339400175fc5b9.mockapi.io/users/${id}`)
      .toPromise();
  }
}
