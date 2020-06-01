import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { AnsiService } from "../../services/ansi.service";
import { File } from "../../models/file";
import { Partner } from "../../models/partner";
import { NzModalService, NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  showSpinner = true;
  listFile: File[] = [];
  validateForm: FormGroup;
  validateForm1: FormGroup;
  partner: Partner;
  isVisible = false;
  file;
  constructor(
    private ansiService: AnsiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      site: ["", [Validators.required], [this.userNameAsyncValidator]],
      adresse: ["", [Validators.required]],
      tel: ["", [Validators.required]],
      fax: ["", [Validators.required]],
    });
    this.validateForm1 = this.fb.group({
      NameFile: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPartner();
    this.listFile = this.ansiService.getFiles();
  }

  getPartner() {
    this.ansiService.getPartner().subscribe(
      (data) => {
        console.log(data);
        this.partner = data;
        this.showSpinner = false
        //this.message.info("Saved");
      },(err) => {
        console.log(err);
        //this.message.warning("deletion error");
      }
    );
  }
  /* Partner */
  submitForm(value: Partner): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    setTimeout(() => {
      this.ansiService.updatePartner(value);
      this.message.info("Saved");
    }, 1000);
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
  /*  Files*/
  startDownload(id: string): void {
    console.log("ID : " + id);
    setTimeout(() => {
      this.ansiService.downloadFile(id);
      this.message.info("file is downloaded");
    }, 1000);
  }

  deleteRow(id: string): void {
    this.listFile = this.listFile.filter((d) => d._id !== id);
    this.ansiService.deleteFile(id);
    this.message.info("file is deleted");
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.validateForm1.valid == true) {
      setTimeout(() => {
        this.ansiService.addFile(this.file);
        this.message.info("file is saved");
      }, 1000);
    } else {
      this.warning("You must fill out the form");
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  warning(x): void {
    this.modalService.warning({
      nzTitle: "Erreur",
      nzContent: x,
    });
  }
}
