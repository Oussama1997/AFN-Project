import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

//import { P404Component } from "./views/error/404.component";
//import { P500Component } from "./views/error/500.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignComponent } from "./sign/sign.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/*====  Directive =====*/
import {
  FileUploader,
  FileSelectDirective,
  FileDropDirective,
} from "ng2-file-upload";
import { FileUploadModule } from "ng2-file-upload";
/*====  Services =====*/
import { AuthService } from "./services/auth.service";

/*====  NG-ZORRO  ====*/
import { NzTableModule } from "ng-zorro-antd/table";
import {
  NgZorroAntdModule,
  NZ_I18N,
  en_US,
  NZ_ICONS,
  fr_FR,
} from "ng-zorro-antd";
import { NzBackTopModule } from "ng-zorro-antd/back-top";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSpinModule, NzMessageModule } from "ng-zorro-antd";

import en from "@angular/common/locales/en";
import { registerLocaleData } from "@angular/common";
import { IconDefinition } from "@ant-design/icons-angular";
import * as AllIcons from "@ant-design/icons-angular/icons";

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
/*Global Configuration Ng Message */
import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NzProgressModule,
    NzPopconfirmModule,
    ChartsModule,
    NzFormModule,
    NzTableModule,
    NzRadioModule,
    NzSpinModule,
    NzMessageModule,
    NgZorroAntdModule,
    NzBackTopModule,
    FileUploadModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    //P404Component,
    //P500Component,
    HomeComponent,
    LoginComponent,
    SignComponent,
    //FileUploader,
    //FileSelectDirective,
    //FileDropDirective,
  ],
  providers: [
    AuthService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
