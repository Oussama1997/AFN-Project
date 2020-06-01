import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = { username: '', password: '' }
  new = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  onConnect() {
    if (this.auth.login(this.user.username, this.user.password) == true)
      this.router.navigate(['dashboard'])
    else
      console.log("Failed Connexion");

    //console.log(this.user.username);
    //console.log(this.user.password);
  }
}
