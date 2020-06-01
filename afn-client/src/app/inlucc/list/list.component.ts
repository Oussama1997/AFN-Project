import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { InluccService } from "../../services/inlucc.service";
import { ReportInlucc } from "../../models/report-inlucc";
import { User } from "../../models/user";
import { NzModalService, NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  listOfReports: ReportInlucc[] = [];
  listOfDisplayData = [];
  radioValue = "All";
  type = "";
  showSpinner = true;
  user: User;
  /*  Sort Et Filtrage */
  searchValue = "";
  sortName: string | null = null;
  sortValue: string | null = null;

  constructor( private message: NzMessageService,
    private inluccService: InluccService, private router: Router) {}

  ngOnInit(): void {
    if (typeof Storage !== "undefined") {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    console.log(this.user);
    this.getReports();
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);
  
  /* */
  log(value: string,data): void {
    if( null == value ){
      data.type = "";
      console.log('Waiting !');
    }else if(value == "Accepted" || value == "Refused"){
      console.log('Accepted || Refused');
    }
    console.log("data : ",data);
    this.inluccService.updateReport1(data).subscribe(
      (data) => {
          console.log(data);
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
  /* Reports */
  getReports() {
    this.inluccService.getReports().subscribe(
      (data) => {
        this.listOfReports = data["reportsInlucc"];
        console.log(data);
        this.listOfDisplayData = [...this.listOfReports];
        this.search();
        this.showSpinner = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  startEdit(id: string): void {
    console.log(id);
    if (id !== undefined || id !== null || id !== "") {
      if (typeof Storage !== "undefined") {
        sessionStorage.setItem("url", JSON.stringify(id));
      }
      this.router.navigate(["/inlucc/list", id]);
    }
  }

  deleteRow(id: string): void {
    this.listOfReports = this.listOfReports.filter((d) => d._id !== id);
    this.listOfDisplayData = [...this.listOfReports];
  }
  printerRow(id: string): void {
    console.log("Printer");
  }
  /*  */
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  /* ==============  Sort et Filtre  ============*/
  /*sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    //console.log(this.sortName);
    //console.log(this.sortValue);
    if (this.sortValue) this.search();
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }

  filterSexeChange(value: string[]): void {
    //this.listOfSearchSexe = value;
    this.search();
  }*/
  search(): void {
    this.searchValue = this.radioValue;
    console.log(this.searchValue);
    const filterFunc = (item: {
      id: string;
      username: string;
      permission: string;
      person: string;
      structure: string;
      sector: string;
      subject: string;
      type: string;
      date: Date;
    }) => {
      if (this.searchValue == "All") return true;
      if (this.searchValue == "Accepted" || this.searchValue == "Refused")
        return item.type.indexOf(this.searchValue) !== -1;
      if (this.searchValue == "Waiting")
        return (
          item.type.indexOf("Accepted") === -1 &&
          item.type.indexOf("Refused") === -1
        );
    };
    //const curTime = this.dateAsYYYYMMDD(new Date());
    //console.log(curTime);
    const data = this.listOfReports.filter(
      (item: {
        id: string;
        username: string;
        permission: string;
        person: string;
        structure: string;
        sector: string;
        subject: string;
        type: string;
        date: Date;
      }) => filterFunc(item)
    );
    /* sort data ascend descend */
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === "ascend"
        ? this.dateAsYYYYMMDD(new Date(a.date)) >
          this.dateAsYYYYMMDD(new Date(b.date))
          ? -1
          : 1
        : this.dateAsYYYYMMDD(new Date(b.date)) >
          this.dateAsYYYYMMDD(new Date(a.date))
        ? -1
        : 1
    );
    //console.log("Sort ", this.listOfDisplayData);
  }

  dateAsYYYYMMDD(date): string {
    return (
      date.getFullYear() +
      "-" +
      this.leftpad(date.getMonth() + 1, 2) +
      "-" +
      this.leftpad(date.getDate(), 2)
    );
  }

  leftpad(val, resultLength = 2, leftpadChar = "0"): string {
    return (String(leftpadChar).repeat(resultLength) + String(val)).slice(
      String(val).length
    );
  }
}
