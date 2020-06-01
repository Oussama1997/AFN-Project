import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from "./user-routing.module";
import { ProfilComponent } from "./profil/profil.component";
import { UsersComponent } from "./users/users.component";
import { NzTableModule } from "ng-zorro-antd/table";
import {
  NzIconModule,
  NzRadioModule,
  NgZorroAntdModule,
  NzButtonModule,
} from "ng-zorro-antd";

/** config angular i18n **/
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import fr from "@angular/common/locales/fr";
import { NZ_I18N, en_US, NZ_ICONS, fr_FR } from "ng-zorro-antd";

import { IconDefinition } from "@ant-design/icons-angular";
import * as AllIcons from "@ant-design/icons-angular/icons";

registerLocaleData(en, fr);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [ProfilComponent, UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NzTableModule,
    NzRadioModule,
    NzIconModule,
    NgZorroAntdModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class UserModule {}
