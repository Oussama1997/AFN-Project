import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Observable, Observer } from "rxjs";
import { AnsiService } from "../../services/ansi.service";
import { ReportAnsi } from "../../models/report-ansi";

@Component({
  selector: "app-complain",
  templateUrl: "./complain.component.html",
  styleUrls: ["./complain.component.css"],
})
export class ComplainComponent implements OnInit {
  ID: any;
  username;
  report: ReportAnsi;
  new = false;
  newReport;
  validateForm: FormGroup;

  constructor(
    private ansiService: AnsiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      permission: [false, [Validators.required]],
      name: ["", [Validators.required], [this.userNameAsyncValidator]],
      site: ["", [Validators.required]],
      typeNews: [false, [Validators.required]],
      subject: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.ID = parseInt(params.get("id"));
    });
    if (
      isNaN(this.ID) ||
      this.ID === NaN ||
      this.ID === undefined ||
      this.ID === null
    ) {
      console.log("ID : " + this.ID);
      this.new = true;
      this.newReport = {
        permission: "",
        name: "",
        site: "",
        typeNews: "",
        subject: "",
        type: "",
      };
    } else {
      console.log("ID : " + this.ID);
      this.new = false;
      this.report = this.ansiService.getReport(this.ID);
      console.log(this.report);
      this.newReport = {
        permission: this.report.permission,
        name: this.report.name,
        site: this.report.site,
        typeNews: this.report.typeNews,
        subject: this.report.subject,
        type: this.report.type,
        date: this.report.date,
      };
    }
  }

  //*     Save    *//
  submitForm(value: ReportAnsi): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    if (this.new == false) {
      console.log("Update");
      setTimeout(() => {
        this.report = {
          _id: this.report._id,
          username: this.report.username,
          permission: this.newReport.permission,
          name: this.newReport.name,
          site: this.newReport.site,
          typeNews: this.newReport.typeNews,
          subject: this.newReport.subject,
          type: this.newReport.type,
          date: this.newReport.date,
        };
        console.log(this.report);
        this.ansiService.updateReport(this.report);
        this.router.navigate(["/inlucc/list"]);
      }, 1000);
    } else if (this.new == true) {
      console.log("Add");
      setTimeout(() => {
        this.username = "User X";
        this.newReport.username = this.username;
        console.log(this.newReport);
        this.ansiService.addReport(this.newReport);
        this.router.navigate(["/inlucc/list"]);
      }, 1000);
    }
  }

  //*     Reset    *//
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
}
