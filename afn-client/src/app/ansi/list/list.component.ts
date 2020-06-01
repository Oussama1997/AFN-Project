import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { AnsiService } from "../../services/ansi.service";
import { ReportAnsi } from "../../models/report-ansi";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  listOfReports: ReportAnsi[] = [];
  listOfDisplayData = [];
  radioValue = "All";
  type = "";
  /*  Sort Et Filtrage */
  searchValue = "";
  sortName: string | null = null;
  sortValue: string | null = null;

  constructor(private ansiService: AnsiService, private router: Router) {}

  ngOnInit(): void {
    this.listOfReports = this.ansiService.getReports();
    this.listOfDisplayData = [...this.listOfReports];
    this.search();
  }

  startEdit(id: string): void {
    this.router.navigate(["/inlucc/list", id]);
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
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortValue) this.search();
  }

  search(): void {
    this.searchValue = this.radioValue;
    const filterFunc = (item: ReportAnsi) => {
      if (this.searchValue == "All") return true;
      else if (this.searchValue == "Accepted" || this.searchValue == "Refused")
        return item.type.indexOf(this.searchValue) !== -1;
      else if (this.searchValue == "Waiting")
        return (
          item.type.indexOf("Accepted") === -1 &&
          item.type.indexOf("Refused") === -1
        );
    };
    const data = this.listOfReports.filter((item: ReportAnsi) =>
      filterFunc(item)
    );
    console.log(this.searchValue);
    /* sort data ascend descend */
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === "ascend"
        ? this.dateAsYYYYMMDD(a.date) > this.dateAsYYYYMMDD(b.date)
          ? -1
          : 1
        : this.dateAsYYYYMMDD(b.date) > this.dateAsYYYYMMDD(a.date)
        ? -1
        : 1
    );
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
