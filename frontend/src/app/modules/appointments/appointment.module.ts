import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentEditorComponent } from './components/appointment-editor/appointment-editor.component';
import { DayEntryComponent } from './components/day-entry/day-entry.component';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventResponderComponent } from './components/event-responder/event-responder.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    CalendarComponent,
    AppointmentEditorComponent,
    DayEntryComponent,
    EventOverviewComponent,
    EventResponderComponent,
    EventEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // needed for routerLink
    AppointmentRoutingModule,
    SharedModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    EventService
  ]
})
export class AppointmentModule { }
