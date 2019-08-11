import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventResponderComponent } from './components/event-responder/event-responder.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';

const routes: Routes = [
  { path: "", component: EventOverviewComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "respond/:title", component: EventResponderComponent },
  { path: "edit/:title", component: EventEditorComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentRoutingModule { }
