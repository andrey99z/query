import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

export interface User {
  id: string;
  createdAt: Date;
  name: string;
  avatar: string;
}

const api = 'https://6145601e38339400175fc5b9.mockapi.io';

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) { }

  getUsers() {
    console.log("API: Users");
    return lastValueFrom(this.http
      .get<User[]>(`${api}/users`))
  }

  getUser(id: any) {
    console.log("API: User", id);
    return lastValueFrom(this.http
      .get<User>(`${api}/users/${id}`))
  }
}
