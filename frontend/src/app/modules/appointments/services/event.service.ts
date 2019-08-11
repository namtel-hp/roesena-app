import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { CalendarEvent } from '../datatypes/CalendarEvent';
import { CalendarDay } from '../datatypes/CalendarDay';
import { HttpService } from 'src/app/core/services/http.service';
import { map, filter, catchError } from 'rxjs/operators';

@Injectable()
export class EventService {

  public editingEvent: CalendarEvent;

  // private events: string[] = ["event 1", "event 2", "event 3", "event 4", "event 5", "event 6"];
  // private participants: string[] = ["person 1", "person 2", "person 3", "person 4", "person 5", "person 6", "person 7", "person 8"];

  // private actualEvents: CalendarEvent[] = [
  //   new CalendarEvent("long", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1 that has a very long name", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019])),
  //   new CalendarEvent("test", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019])),
  //   new CalendarEvent("test", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019])),
  //   new CalendarEvent("test", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019])),
  //   new CalendarEvent("test", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019])),
  //   new CalendarEvent("test", "# boom", new CalendarDay([1, 3, 2019]), new CalendarDay([2, 3, 2019]), [{name: "person 1", response: 0}, {name: "person 2", response: 4}], new CalendarDay([2, 3, 2019]))
  // ];

  // private currentUser: string = "person 2";

  constructor(private _httpServ: HttpService) { }

  getEvents(): Observable<any[]> {
    // return of(this.actualEvents);
    return this._httpServ.getAppointments().pipe(
      map( el => el.filter( el => el instanceof CalendarEvent )),
      // filter( el => el instanceof CalendarEvent ),
      catchError( el => throwError(el) )
    );
  }

  newEvent(newEv: CalendarEvent) {
    console.log(newEv);
    this._httpServ.addAppointment(newEv).subscribe();
  }

  // getParticipants(): Observable<string[]> {
  //   return of(this.participants);
  // }

  // getUser(): Observable<string> {
  //   return of(this.currentUser);
  // }
}
