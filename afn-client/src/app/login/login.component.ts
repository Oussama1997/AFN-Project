import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user = { username: "", password: "" };
  new = false;
  validateForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.validateForm = this.fb.group({
      username: ["", [Validators.required], [this.userNameAsyncValidator]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onConnect(value): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.authService.login(value).subscribe(
      (user)=>{
        console.log(user);
        this.router.navigate(['/dashboard'])
        if(typeof(Storage)!== 'undefined'){
          sessionStorage.setItem("user",JSON.stringify(user));
        }
      },
      (err)=>{
        console.log(err);
        console.log("Failed Connexion");
      }
    );
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === "JasonWood") {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
}
