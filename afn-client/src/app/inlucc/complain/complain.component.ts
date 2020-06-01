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
import { ReportInlucc } from "../../models/report-inlucc";
import { InluccService } from "../../services/inlucc.service";
import { NzModalService, NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-complain",
  templateUrl: "./complain.component.html",
  styleUrls: ["./complain.component.css"],
})
export class ComplainComponent implements OnInit {
  //  textValue: string | null = "";
  showSpinner = true;
  ID: any;
  report: ReportInlucc;
  new = false;
  newReport;
  validateForm: FormGroup;
  user;
  constructor(
    private inluccService: InluccService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      permission: [false, [Validators.required]],
      person: ["", [Validators.required], [this.userNameAsyncValidator]],
      structure: ["", [Validators.required]],
      sector: [false, [Validators.required]],
      subject: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if(typeof(Storage)!== 'undefined'){
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.ID = parseInt(params.get("id"));
      console.log(this.ID);
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
        person: "",
        structure: "",
        sector: "",
        subject: "",
        type: "",
      };
      this.showSpinner = false;
    } else {
      if(typeof(Storage)!== 'undefined'){
        this.ID = JSON.parse(sessionStorage.getItem("url"));
      }
      console.log("ID : " + this.ID);
      this.new = false;
      this.getReport();
      //this.report = this.inluccService.Report(this.ID);
      console.log(this.report);
      /*this.newReport = {
        permission: this.report.permission,
        person: this.report.person,
        structure: this.report.structure,
        sector: this.report.sector,
        subject: this.report.subject,
        type: this.report.type,
        date: this.report.date,
      };*/
    }
  }

  getReport() {
    this.showSpinner = true;
    this.inluccService.getReport(this.ID).subscribe(
      (data) => {
        console.log(data);
        this.report = data;
        this.newReport = {
          permission: this.report.permission,
          person: this.report.person,
          structure: this.report.structure,
          sector: this.report.sector,
          subject: this.report.subject,
          type: this.report.type,
          date: this.report.date,
        };
        this.message.info("Saved");
        this.message.info("Saved");
        this.showSpinner = false;
      },
      (err) => {
        console.log(err);
        this.message.warning("deletion error");
        this.message.warning("deletion error");
      }
    );
  }
  //*     Save    *//
  submitForm(value: ReportInlucc): void {
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
          person: this.newReport.person,
          structure: this.newReport.structure,
          sector: this.newReport.sector,
          subject: this.newReport.subject,
          type: this.newReport.type,
          date: this.newReport.date,
        };
        console.log(this.report);
        this.inluccService.updateReport(this.report).subscribe(
          (data) => {
            console.log(data);
            this.message.info("Saved");
            this.message.info("Saved");
            this.showSpinner = false;
            this.router.navigate(["/inlucc/list"]);
          },
          (err) => {
            console.log(err);
            this.message.warning("deletion error");
            this.message.warning("deletion error");
          }
        );
      }, 1000);
    } else if (this.new == true) {
      console.log("Add");
      setTimeout(() => {
        this.newReport.username = this.user.username;
        console.log(this.newReport);
        this.inluccService.addReport(this.newReport).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["/inlucc/list"]);
          },
          (err) => {
            console.log(err);
          }
        );
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
