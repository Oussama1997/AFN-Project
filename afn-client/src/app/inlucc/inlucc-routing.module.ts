import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { ListComponent } from "./list/list.component";
import { ComplainComponent } from "./complain/complain.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "INLUCC",
    },
    children: [
      {
        path: "",
        redirectTo: "about",
      },
      {
        path: "about",
        component: AboutComponent,
        data: {
          title: "About",
        },
      },
      {
        path: "list",
        component: ListComponent,
        data: {
          title: "Reports",
        },
      },
      {
        path: "list/:id",
        component: ComplainComponent,
      },
      {
        path: "complain",
        component: ComplainComponent,
        data: {
          title: "Complain",
        },
      },
    ],
  },
];
/*const routes: Routes = [
  {
    path:"about", component:AboutComponent
  },
  {
    path:"list", component:ListComponent
  },
  {
    path:"complain", component:ComplainComponent
  }
];*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InluccRoutingModule {}
