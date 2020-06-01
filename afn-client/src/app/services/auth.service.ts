import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, Observer, throwError } from "rxjs";
import { Router } from "@angular/router";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly baseURL = "http://localhost:4600/";
  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + "register", user, httpOptions);
  }

  login(user): Observable<{}> {
    return this.http.post<User>(this.baseURL + "login", user);
  }

  update(id, user): Observable<User> {
    return this.http.put<User>(this.baseURL + "users/" + id, user);
  }

  update1(id, user): Observable<User> {
    return this.http.put<User>(this.baseURL + "users1/" + id, user);
  }

  signOutUser() {
    this.router.navigate(["/home"]);
  }
}
