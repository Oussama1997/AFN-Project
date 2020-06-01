import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Observer, throwError, Subject } from "rxjs";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  listUser: User[];
  users: User[];
  sortValue: string | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.listUser = data["users"];
        console.log(data);
        this.users = this.listUser;
        this.sortByDate();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  search(val) {
    console.log("val : " + val);
    this.listUser = this.users;
    let aux: User[] = [];
    for (let i of this.listUser) {
      console.log(i.date);
      let x = this.dateAsYYYYMMDD(new Date(i.date));
      console.log(x);
      if (
        i.username.indexOf(val) >= 0 ||
        i.email.indexOf(val) >= 0 ||
        this.dateAsYYYYMMDD(new Date(i.date)).indexOf(val) >= 0
      ) {
        aux.push(i);
      }
    }
    this.listUser = aux;
  }

  deleteRow(id: string): void {
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      (err) => {
        console.log(err);
        this.message.warning("deletion error");
      },
      (res) => {
        console.log(res.success);
        this.message.info(res.success);
      }
    );
    this.listUser = this.listUser.filter((d) => d._id !== id);
  }
  sortByDate(): void {
    this.sortValue = "ascend";
    const data = this.listUser;
    /* sort data ascend descend */

    this.listUser = data.sort((a, b) =>
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
  }

  dateAsYYYYMMDD(date): string {
    return (
      date.getFullYear() +
      "/" +
      this.leftpad(date.getMonth() + 1, 2) +
      "/" +
      this.leftpad(date.getDate(), 2)
    );
  }

  leftpad(val, resultLength = 2, leftpadChar = "0"): string {
    return (String(leftpadChar).repeat(resultLength) + String(val)).slice(
      String(val).length
    );
  }
}
