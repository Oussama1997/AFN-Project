import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InluccRoutingModule } from "./inlucc-routing.module";
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
  declarations: [AboutComponent, ComplainComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InluccRoutingModule,
    NzRadioModule,
    NzInputModule,
    NgZorroAntdModule,
    NzTableModule,
  ],
})
export class InluccModule {}
