import { Injectable } from "@angular/core";
import { File } from "../models/file";
import { Partner } from "../models/Partner";
import { ReportAnsi } from "../models/report-ansi";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class AnsiService {
  readonly baseURL = "http://localhost:4600/";
  listOfFile: File[] = [];
  listOfReport: ReportAnsi[] = [];

  constructor(private http: HttpClient) {}
  getPartner() {
    return this.http.get<Partner>(
      this.baseURL + "partners/" + "5ece8e7b659f2f2f989b5c2c"
    );
  }
  updatePartner(partner: Partner) {
    return this.http.put<Partner>(this.baseURL + "partners/"+"5ece8e7b659f2f2f989b5c2c", partner);
  }  getReport(id) {
    return {
      id: "0",
      username: "User 0",
      permission: "YES",
      name: "Edward King 0",
      site: "32",
      typeNews: "Public",
      subject: "London, Park Lane no. 0",
      type: "",
      date: new Date(),
    };
  }
  addReport(report: ReportAnsi) {
    this.listOfReport.push(report);
  }
  updateReport(report: ReportAnsi) {}
  getReports() {
    return (this.listOfReport = [
      {
        _id: "0",
        username: "User 0",
        permission: "YES",
        name: "Edward King 0",
        site: "32",
        typeNews: "Public",
        subject: "London, Park Lane no. 0",
        type: "",
        date: new Date(),
      },
      {
        _id: "1",
        username: "User 1",
        permission: "YES",
        name: "Edward King 1",
        site: "32",
        typeNews: "Public",
        subject: "London, Park Lane no. 1",
        type: "",
        date: new Date(),
      },
      {
        _id: "2",
        username: "User 2",
        permission: "YES",
        name: "Edward King 2",
        site: "32",
        typeNews: "Prive",
        subject: "London, Park Lane no. 2",
        type: "Accepted",
        date: new Date(),
      },
      {
        _id: "3",
        username: "User 3",
        permission: "YES",
        name: "Edward King 3",
        site: "32",
        typeNews: "Prive",
        subject: "London, Park Lane no. 3",
        type: "Refused",
        date: new Date(),
      },
    ]);
  }
  getFiles() {
    return (this.listOfFile = [
      {
        _id: `0`,
        namefile: `Edward King 0`,
        date: new Date(),
        file: "32",
        path: "0",
      },
      {
        _id: `1`,
        namefile: `Edward King 1`,
        date: new Date(),
        file: "32",
        path: "1",
      },
      {
        _id: `2`,
        namefile: `Edward King 2`,
        date: new Date(),
        file: "32",
        path: "2",
      },
    ]);
  }
  addFile(file) {}
  downloadFile(id) {}
  deleteFile(id) {}
}
