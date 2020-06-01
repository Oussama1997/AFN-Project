import { Injectable } from "@angular/core";
import { File } from "../models/file";
import { Partner } from "../models/Partner";
import { ReportInlucc } from "../models/report-inlucc";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class InluccService {
  readonly baseURL = "http://localhost:4600/";
  listOfFile: File[] = [];
  listOfReport: ReportInlucc[] = [];

  constructor(private http: HttpClient) {}
  getPartner() {
    return this.http.get<Partner>(
      this.baseURL + "partners/" + "5ece8dde659f2f2f989b5c2b"
    );
  }
  updatePartner(partner: Partner) {
    return this.http.put<Partner>(
      this.baseURL + "partners/" + "5ece8dde659f2f2f989b5c2b",
      partner
    );
  }
  /* Report */
  getReport(id) {
    return this.http.get<ReportInlucc>(this.baseURL + "reportsInlucc/" + id);
  }
  addReport(report: ReportInlucc) {
    return this.http.post<ReportInlucc>(
      this.baseURL + "reportsInlucc/add",
      report
    );
  }
  updateReport(report: ReportInlucc) {
    return this.http.put<ReportInlucc>(
      this.baseURL + "reportsInlucc/" + report._id,
      report
    );
  }
  updateReport1(report: ReportInlucc) {
    return this.http.put<ReportInlucc>(
      this.baseURL + "reportsInlucc1/" + report._id,
      report
    );
  }
  getReports() {
    return this.http.get<ReportInlucc[]>(this.baseURL + "reportsInlucc/");
  }
  /* File */
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
