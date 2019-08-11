import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { first } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http.service';
import { AppointmentEditorComponent } from '../appointment-editor/appointment-editor.component';
import { DayEntryComponent } from '../day-entry/day-entry.component';
import { CalendarDay } from '../../datatypes/CalendarDay';
import { CalendarAppointment } from '../../datatypes/CalendarAppointment';
import { CalendarMonth } from '../../datatypes/CalendarMonth';
import { WeekdayEnum } from '../../datatypes/Weekday';

@Component({
  selector: 'month-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewChecked {

// ----------------------------------------------------------------------------------------------------------------------------------------------
  @ViewChild("appoEdit")
  private _editorComp: AppointmentEditorComponent;
  @ViewChildren("dayCells")
  private _days: QueryList<DayEntryComponent>;
// ----------------------------------------------------------------------------------------------------------------------------------------------
  public isAppointmentEditing: boolean = false;
  public displayedMonth: CalendarMonth;
  private _appointments: CalendarAppointment[];
// ----------------------------------------------------------------------------------------------------------------------------------------------

  constructor(private _service: HttpService, private _cdr: ChangeDetectorRef) {
    // start with the current month
    this.displayedMonth = getCalendarMonth(new Date());
    // load all appointments
    this._service.getAppointments()
    .pipe( first() )
      .subscribe( el => {
        this._appointments = el;
        this._distributeAppointments();
      });
  }

  ngOnInit() { }

  ngAfterViewChecked() {  
    if(this._appointments) this._distributeAppointments();
  }

  public selectEl(ev: CalendarDay | CalendarAppointment) {
    if(this._editorComp) this._editorComp.selectedElement.next(ev);
  }

  private _distributeAppointments() {
    const appos = this._appointments;
    // reset the appointments
    this._days.toArray().forEach( el => el.appointments = [] );
    // go through all the appointments
    appos.forEach( appo => {
      if(appo.start.date.month === this.displayedMonth.month && appo.end.date.month === this.displayedMonth.month) {
        // start and end are in the current month -> add appointment to all days that are between
        for(var i = appo.start.date.day; i <= appo.end.date.day; i++) {
          this._days.toArray()[i - 1].appointments.push(appo);
        }
      } else if(!(appo.start.date.month === this.displayedMonth.month) && appo.end.date.month === this.displayedMonth.month) {
        // start is not in this month, but the end ist -> add appointment to end date and all days before in this month
        // start at date="1" and end on date where appointment ends
        for(var i = 1; i <= appo.end.date.day; i++) {
          this._days.toArray()[i - 1].appointments.push(appo);
        }
      } else if(appo.start.date.month === this.displayedMonth.month && !(appo.end.date.month === this.displayedMonth.month)) {
        // starts in this month but end is outside -> add appointment to all 
        // start at the beginning of this month and add appointment to all remaining days in this month
        for(var i = appo.start.date.day; i <= this._days.toArray().length; i++) {
          this._days.toArray()[i - 1].appointments.push(appo);
        }
      } else if(this._days.toArray()[0].day.isIn(appo)) {
        // if the first day is in it and it begins before this month and ands after it, all other days are in it too
        this._days.toArray().forEach( el => el.appointments.push(appo) );
      }
    });
    // tell the changedetector that children have changed after all changes are made
    this._cdr.detectChanges();
  }

  public switchMonth(backwards: boolean) {
    if(backwards) {
      // year switches
      if(this.displayedMonth.month === 1) this.displayedMonth = getCalendarMonth(new Date(this.displayedMonth.year - 1, 11));
      // year stays the same, -2 because January is 0 and month has to be one lass than before
      else this.displayedMonth = getCalendarMonth(new Date(this.displayedMonth.year, this.displayedMonth.month - 2));
    } else {
      // year switches
      if(this.displayedMonth.month === 12) this.displayedMonth = getCalendarMonth(new Date(this.displayedMonth.year + 1, 0));
      // year stays the same
      else this.displayedMonth = getCalendarMonth(new Date(this.displayedMonth.year, this.displayedMonth.month));
    }
  }

  public getTitle(month: CalendarMonth): string {
    return month.getMonthAsString() + " " + month.year;
  }
}

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}
function getFirstWeekday(month: number, year: number): WeekdayEnum {
  switch(new Date(year, month, 1).getDay()) {
    case 0: return WeekdayEnum.sunday;
    case 1: return WeekdayEnum.monday;
    case 2: return WeekdayEnum.tuesday;
    case 3: return WeekdayEnum.wednesday;
    case 4: return WeekdayEnum.thursday;
    case 5: return WeekdayEnum.friday;
    case 6: return WeekdayEnum.saturday;
  }
}
function getCalendarMonth(date: Date): CalendarMonth {
  return new CalendarMonth(
    date.getMonth() + 1,
    date.getFullYear(),
    daysInMonth(date.getMonth() + 1, date.getFullYear()),
    getFirstWeekday(date.getMonth(), date.getFullYear())
  );
}