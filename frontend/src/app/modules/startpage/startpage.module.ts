import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageComponent } from './components/startpage/startpage.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StartpageComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StartpageComponent
  ]
})
export class StartpageModule { }
