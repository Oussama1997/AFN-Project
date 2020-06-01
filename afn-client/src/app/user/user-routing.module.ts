import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfilComponent } from "./profil/profil.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "User",
    },
    children: [
      {
        path: "",
        redirectTo: "profil",
      },
      {
        path: "profil",
        component: ProfilComponent,
        data: {
          title: "¨Profil",
        },
      },
      {
        path: "users",
        component: UsersComponent,
        data: {
          title: "Users",
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
