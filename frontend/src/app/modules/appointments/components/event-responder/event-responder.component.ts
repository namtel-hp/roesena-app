import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CalendarEvent } from '../../datatypes/CalendarEvent';

@Component({
  selector: 'rsn-event-responder',
  templateUrl: './event-responder.component.html',
  styleUrls: ['./event-responder.component.scss']
})
export class EventResponderComponent implements OnInit {

  /**
   * The event that is currently displayed
   * @type {CalendarEvent}
   * @memberof EventResponderComponent
   */
  public data: CalendarEvent;

  constructor(private _http: HttpService, private route: ActivatedRoute, public auth: AuthenticationService) {
    // get the route parameters
    this.route.paramMap.pipe( first() ).subscribe(
      // get the appointment with the title from the route
      map => this._http.getAppointments(map.get('title').replace('%20', ' ')).pipe( first() ).subscribe(
        el => {
          const ev = el[0];
          if(ev instanceof CalendarEvent) {
            this.data = ev;
          } else {
            throw new Error("ev is no Event, this should not happen");
          }
        }
      )
    );
  }

  ngOnInit() { }

  save() {
    console.log(this.data);
  }

}
