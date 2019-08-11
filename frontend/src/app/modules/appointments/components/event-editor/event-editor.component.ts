import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { EventService } from '../../services/event.service';
import { CalendarEvent } from '../../datatypes/CalendarEvent';
import { CalendarDay } from '../../datatypes/CalendarDay';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CalendarAppointment } from '../../datatypes/CalendarAppointment';

@Component({
  selector: 'rsn-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  public title: string = "";
  public startDate: string = "";
  public startTime: string = "";
  public endDate: string = "";
  public endTime: string = "";
  public description: string = "";
  public deadline: string = "";
  public participants: string [] = [];

  public filter: string = "";
  public unassigned: string[] = [];
  // this is true when not a new event is created but an already existing one is edited
  public oldTitle: string;

  constructor(private route: ActivatedRoute, private _http: HttpService) {
    // get the list of persons
    this._http.getPerson().pipe( first() ).subscribe( el => {
      this.unassigned = el;
      // get the route parameters
      this.route.paramMap.pipe( first() ).subscribe( map => {
        const param = map.get('title');
        if(param === ':new') {
          // if there is an appointment in the sessionStorage, use this data
          try {
            const vals = JSON.parse(sessionStorage.getItem("appointment"));
            this.title = vals.title;
            this.startDate = vals.start.date.day + "." + vals.start.date.month + "." + vals.start.date.year;
            this.startTime = vals.start.time;
            this.endDate = vals.end.date.day + "." + vals.end.date.month + "." + vals.end.date.year;
            this.endTime = vals.end.time;
            sessionStorage.removeItem("appointment");
          } catch (e) { }
        } else {
          this.oldTitle = param.replace('%20', ' ');
          // get the appointment with the title from the route
          this._http.getAppointments(this.oldTitle).pipe( first() ).subscribe(
            el => {
              const ev = el[0];
              if(ev instanceof CalendarEvent) {
                this.title = ev.title;
                this.startDate = ev.start.date.toDotFormat();
                this.startTime = ev.start.time;
                this.endDate = ev.end.date.toDotFormat();
                this.endTime = ev.end.time;
                this.description = ev.description;
                this.deadline = ev.deadline.toDotFormat();
                this.participants = ev.participants.map( el => el.name );
                this.participants.forEach( exists => 
                  this.unassigned.splice(
                    this.unassigned.findIndex( el => el === exists), 1));
                  } else {
                    throw new Error("ev is no Event, this should not happen");
                  }
            }
          )
        }
      });
    });
  }

  ngOnInit() { }

  public save() {
    // only safe if input is ok
    if(this._isValid()) {
      // create the new event that has to be saved
      const newEvent: CalendarEvent = new CalendarEvent(
        this.title,
        this.description,
        { date: new CalendarDay(this.startDate.split(".").map( el => +el)), time: this.startTime },
        { date: new CalendarDay(this.endDate.split(".").map( el => +el )), time: this.endTime },
        this.participants.map( el => { return { name: el, response: undefined } }),
        new CalendarDay(this.deadline.split(".").map( el => +el ))
      );
      if(this.oldTitle) {
        // if an existing event was edited, repalce the old one
        this._http.replaceAppointment(this.oldTitle, newEvent).pipe( first() ).subscribe();
      } else {
        // add the event as a new one
        this._http.addAppointment(newEvent).pipe( first() ).subscribe();
      }
    }
  }

  public updateDescription(ev: string) {
    this.description = ev;
  }

  public addParticipant(newP: string) {
    // clear the filter input
    this.filter = "";
    // move the name from the unassigned to the participants
    this.participants.push(
      this.unassigned.splice(
        this.unassigned.findIndex( el => el === newP ), 1).toString());
    // focus the input so you can directly start typing
    document.getElementById("unassignedListInput").focus();
  }

  public removeParticipant(remP: string) {
    this.unassigned.push(
      this.participants.splice(
        this.participants.findIndex( el => el === remP ), 1).toString());
  }

  private _isValid(): boolean {
    return (
      (document.getElementById("EVTitle") as HTMLInputElement).checkValidity() &&
      (document.getElementById("EVStartDate") as HTMLInputElement).checkValidity() &&
      (document.getElementById("EVStartTime") as HTMLInputElement).checkValidity() &&
      (document.getElementById("EVEndDate") as HTMLInputElement).checkValidity() &&
      (document.getElementById("EVEndTime") as HTMLInputElement).checkValidity() &&
      (document.getElementById("EVDeadline") as HTMLInputElement).checkValidity() &&
      this.participants.length > 0
    );
  }

}