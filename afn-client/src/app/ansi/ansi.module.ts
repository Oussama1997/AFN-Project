import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AnsiRoutingModule } from "./ansi-routing.module";
import { AboutComponent } from "./about/about.component";
import { ComplainComponent } from "./complain/complain.component";
import { ListComponent } from "./list/list.component";

import { NzTableModule } from "ng-zorro-antd/table";
import { NzInputModule } from "ng-zorro-antd/input";
import {
  NzIconModule,
  NzRadioModule,
  NgZorroAntdModule,
  NzButtonModule,
} from "ng-zorro-antd";
import { NzModalModule } from "ng-zorro-antd/modal";

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
  declarations: [AboutComponent, ListComponent, ComplainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnsiRoutingModule,
    NzRadioModule,
    NzInputModule,
    NgZorroAntdModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
  ],
})
export class AnsiModule {}
