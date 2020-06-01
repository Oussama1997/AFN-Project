import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { InluccService } from "../../services/inlucc.service";
import { File } from "../../models/file";
import { Partner } from "../../models/partner";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FileUploader } from "ng2-file-upload";

InluccService;
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
  isVisible = false;
  partner: Partner;
  file;
  /* file 
  private files = [];
  private url = "http://localhost:4600/upload";
  private uploader: FileUploader;*/
  constructor(
    private inluccService: InluccService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      name: ["", [Validators.required], [this.userNameAsyncValidator]],
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
    this.listFile = this.inluccService.getFiles();
    /*this.uploader = new FileUploader({ url: this.url });

    this.inluccService.showFileNames().subscribe((response) => {
      for (let i = 0; i < response.json().length; i++) {
        this.files[i] = {
          filename: response.json()[i].filename,
          originalname: response.json()[i].originalname,
          contentType: response.json()[i].contentType,
        };
      }
    });*/
  }

  getPartner() {
    this.inluccService.getPartner().subscribe(
      (data) => {
        console.log(data);
        this.partner = data;
        this.showSpinner = false;
        //this.message.info("Saved");
        //this.message.info("Saved");
      },
      (err) => {
        console.log(err);
        this.message.warning("deletion error");
        this.message.warning("deletion error");
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
      this.inluccService.updatePartner(value);
      this.message.info("Saved");
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

  /* Files */
  startDownload(id: string): void {
    console.log("ID : " + id);
    setTimeout(() => {
      this.inluccService.downloadFile(id);
      this.message.info("file is downloaded");
    }, 2000);
  }

  deleteRow(id: string): void {
    this.listFile = this.listFile.filter((d) => d._id !== id);
    this.inluccService.deleteFile(id);
    this.message.info("file is deleted");
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.validateForm1.valid == true) {
      setTimeout(() => {
        this.inluccService.addFile(this.file);
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
/*
  downloadPdf(filename) {
    this.inluccService.downloadPDF(filename).subscribe((res) => {
      const file = new Blob([res.blob()]);
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }*/
}
