import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"],
})
export class ProfilComponent implements OnInit {
  optionList: string[] = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Le Kef",
    "Mahdia",
    "La Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  showSpinner = true;
  user: User;
  selectedUser = null;
  isLoading = false;
  newuser: User;
  //date = null;
  ngOnInit(): void {
    if (typeof Storage !== "undefined") {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    this.showSpinner = false;
    console.log(this.user);
  }

  validateForm: FormGroup;
  validateForm1: FormGroup;

  submitForm(value: {
    username: string;
    email: string;
    password: string;
    confirm: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.newuser = {
      username: value.username,
      email: value.email,
      password: value.password,
    };
    this.showSpinner = true;
    this.authService.update(this.user._id, this.newuser).subscribe(
      (data) => {
        console.log(data);
        //this.user = data["data"];
        this.showSpinner = false;
        this.message.info("Saved");
      },
      (err) => {
        console.log(err);
        this.message.warning("deletion error");
      }
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
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

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private message: NzMessageService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      username: ["", [Validators.required], [this.userNameAsyncValidator]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      confirm: ["", [this.confirmValidator]],
    });
    this.validateForm1 = this.fb.group({
      firstName: ["", [Validators.required], [this.userNameAsyncValidator]],
      lastName: ["", [Validators.required], [this.userNameAsyncValidator]],
      CIN: ["", [Validators.required]],
      dateB: [null, [Validators.required]],
      Profession: ["", [Validators.required]],
      adresse: ["", [Validators.required]],
      ville: [null, [Validators.required]],
      tel: ["", [Validators.required]],
      gender: [null, [Validators.required]],
      agree: [false, [Validators.required]],
    });
  }

  submitForm1(value: {
    firstName: string;
    lastName: string;
    cin: string;
    dateB: Date;
    profession: string;
    adresse: string;
    ville: string;
    tel: number;
    gender: string;
  }): void {
    for (const key in this.validateForm1.controls) {
      this.validateForm1.controls[key].markAsDirty();
      this.validateForm1.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.showSpinner = true;
    this.authService.update1(this.user._id, value).subscribe(
      (data) => {
        console.log(data);
        //this.user = data["data"];
        console.log(this.user);
        this.showSpinner = false;
        this.message.info("Saved");
      },
      (err) => {
        console.log(err);
        this.message.warning("deletion error");
      }
    );
  }

  resetForm1(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm1.reset();
    for (const key in this.validateForm1.controls) {
      this.validateForm1.controls[key].markAsPristine();
      this.validateForm1.controls[key].updateValueAndValidity();
    }
  }

  userNameAsyncValidator1 = (control: FormControl) =>
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

  /*confirmValidator1 = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    return {};
  };*/
}
