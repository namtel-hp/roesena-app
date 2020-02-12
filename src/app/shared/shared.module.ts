import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

import { ToLocalDateStringPipe } from "./pipes/to-local-date-string.pipe";

const components = [NavBarComponent];
const pipes = [ToLocalDateStringPipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, RouterModule],
  exports: [...components, ...pipes]
})
export class SharedModule {}
