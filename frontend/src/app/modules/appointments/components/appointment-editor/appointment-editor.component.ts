import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http.service';
import { CalendarAppointment } from 'src/app/modules/appointments/datatypes/CalendarAppointment';
import { CalendarDay } from '../../datatypes/CalendarDay';
import { Router } from '@angular/router';

@Component({
  selector: 'appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.scss'],
  host: {
    "[class.active]": "selectedElement.getValue() != undefined"
  }
})
export class AppointmentEditorComponent implements OnInit, OnDestroy {

  // ----------------------------------------------------------------------------------------------------------------------------------------------
    public title: string = "";
    public startDate: string = "";
    public startTime: string = "";
    public endDate: string = "";
    public endTime: string = "";
  // ----------------------------------------------------------------------------------------------------------------------------------------------
    public selectedElement: BehaviorSubject<CalendarDay | CalendarAppointment> = new BehaviorSubject<CalendarDay | CalendarAppointment>(undefined);
    private _sub: Subscription;
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this._sub = this.selectedElement.subscribe( selected => {
      if(selected instanceof CalendarAppointment) {
        this.title = selected.title;
        this.startDate = selected.start.date.toDotFormat();
        this.startTime = selected.start.time;
        this.endDate = selected.end.date.toDotFormat();
        this.endTime = selected.end.time;
      } else if(selected instanceof CalendarDay) {
        this.startDate = this.endDate = selected.toDotFormat();
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  public saveAppointment() {
    if(this._checkValidity()) {
      const selected = this.selectedElement.getValue();
      if(selected instanceof CalendarDay) {
        // add a new appointment
        this._http.addAppointment(
          new CalendarAppointment(
            this.title,
            undefined,
            { date: new CalendarDay(this.startDate.split(".").map( el => +el)), time: this.startTime },
            { date: new CalendarDay(this.endDate.split(".").map( el => +el)), time: this.endTime }
          )
        ).pipe( first() ).subscribe();
      } else if(selected instanceof CalendarAppointment) {
        // edit the old one
        this._http.replaceAppointment(selected.title,
          new CalendarAppointment(
            this.title,
            undefined,
            { date: new CalendarDay(this.startDate.split(".").map( el => +el)), time: this.startTime },
            { date: new CalendarDay(this.endDate.split(".").map( el => +el)), time: this.endTime }
          )
        ).pipe( first() ).subscribe();
      }
      this.selectedElement.next(undefined);
    } else {
      // the input does not match the expected pattern
      console.error("no data saved, input is not valid");
    }
  }

  public close() {
    this.selectedElement.next(undefined);
    this.title = this.startDate = this.endDate = this.startTime = this.endTime = undefined;
  }

  public createEvent() {
    // add the current state of the appointment to the localStorage so it can be used when 
    sessionStorage.setItem("appointment", JSON.stringify(new CalendarAppointment(
      this.title, undefined,
      { date: new CalendarDay(this.startDate.split(".").map( el => +el)), time: this.startTime },
      { date: new CalendarDay(this.endDate.split(".").map( el => +el)), time: this.endTime }
    )));
    this._router.navigate(['appointments/edit', ':new']);
  }

  /**
   * checks if everything is filled out and has valid values\
   * takes into accout that no time is needed when an appointment takes the entire day
   * @private
   * @returns {boolean}
   * @memberof DayEditingComponent
   */
  private _checkValidity(): boolean {
    return (
      (document.getElementById("titleInput") as HTMLInputElement).checkValidity() &&
      (document.getElementById("startDate") as HTMLInputElement).checkValidity() &&
      (document.getElementById("startTime") as HTMLInputElement).checkValidity() &&
      (document.getElementById("endDate") as HTMLInputElement).checkValidity() &&
      (document.getElementById("endTime") as HTMLInputElement).checkValidity()
    );
  }
}
