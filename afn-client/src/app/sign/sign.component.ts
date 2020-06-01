import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Observer } from "rxjs";
import { NzMessageService } from "ng-zorro-antd";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user";

@Component({
  selector: "app-sign",
  templateUrl: "./sign.component.html",
  styleUrls: ["./sign.component.css"],
})
export class SignComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      username: ["", [Validators.required], [this.userNameAsyncValidator]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      confirm: ["", [this.confirmValidator]],
    });
  }

  ngOnInit(): void {}

  register(user: User) {
    this.authService.register(user).subscribe(
      (data) => {
        //this.listUser = data["users"];
        console.log(data);
        this.router.navigate(["/dashboard"]);
        if(typeof(Storage)!== 'undefined'){
          sessionStorage.setItem("user",JSON.stringify(user));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitForm(value): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.register({
      username: value.username,
      email: value.email,
      password: value.password,
    });
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

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
