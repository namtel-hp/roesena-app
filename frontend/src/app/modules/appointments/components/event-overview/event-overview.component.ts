import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CalendarEvent } from '../../datatypes/CalendarEvent';
import { HttpService } from 'src/app/core/services/http.service';
import { CalendarAppointment } from '../../datatypes/CalendarAppointment';

@Component({
  selector: 'rsn-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss']
})
export class EventOverviewComponent implements OnInit {

  public events: CalendarEvent[];
  public appointments: CalendarAppointment[];

  constructor(public _http: HttpService, private router: Router) {
    this._http.getAppointments().pipe( first() ).subscribe( el => {
      this.appointments = el;
      this.events = el.filter( el => el instanceof CalendarEvent ) as CalendarEvent[];
    });
  }

  ngOnInit() { }

}
