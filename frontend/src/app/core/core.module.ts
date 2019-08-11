import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../shared/shared.module';
import { StartpageModule } from '../modules/startpage/startpage.module';
import { ErrorComponent } from './components/error-page/error.component';

@NgModule({
  declarations: [ CoreComponent, ErrorComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreRoutingModule,
    StartpageModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ CoreComponent ]
})
export class CoreModule {}
