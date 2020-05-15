import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authentificated: boolean;
  private authenticationToken: string;

  constructor() { }
  
  login(username, password) {
    if (username === 'admin' && password === "123") {
      this.authentificated = true;
      this.authenticationToken = "admin_azerty";
      localStorage.setItem('userToken', this.authenticationToken);
      return this.authentificated;
    }
    else return false;
  }
}
