import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, Observer, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

//import "rxjs/add/operator/map";
//import "rxjs/add/operator/toPromise";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class UserService {
  
  listOfData: User[] = [];
  readonly baseURL = "http://localhost:4600/";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + "users");
  }
  deleteUser(id): Observable<{}> {
    return this.http.delete(this.baseURL + "users/" + id);
  }
}
