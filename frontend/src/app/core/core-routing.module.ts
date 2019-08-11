import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpageComponent } from '../modules/startpage/components/startpage/startpage.component';
import { ErrorComponent } from './components/error-page/error.component';

const routes: Routes = [
  { path: "", component: StartpageComponent },
  { path: "appointments", loadChildren: '../modules/appointments/appointment.module#AppointmentModule' },
  { path: "**", component: ErrorComponent }
  // { path: "checklist", component: ChecklistComponent },
  // { path: "groups", component: LandingpageComponent },
  // { path: "events", component: LandingpageComponent },
  // { path: "archive", component: LandingpageComponent },
  // { path: "media", component: LandingpageComponent },
  // { path: "references", component: LandingpageComponent },
  // { path: "about", component: LandingpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }