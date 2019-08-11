import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CalendarDay } from 'src/app/modules/appointments/datatypes/CalendarDay';
import { CalendarAppointment } from 'src/app/modules/appointments/datatypes/CalendarAppointment';

@Component({
  selector: 'day-entry',
  templateUrl: './day-entry.component.html',
  styleUrls: ['./day-entry.component.scss']
})
export class DayEntryComponent implements OnInit {

  @Input("day")
  public day: CalendarDay;

  @Output("selectedElem")
  private _selectedElem: EventEmitter<CalendarAppointment | CalendarDay> = new EventEmitter<CalendarAppointment | CalendarDay>();

  public appointments: CalendarAppointment[] = [];

  constructor() { }

  ngOnInit() { }

  @HostListener("click", ['$event.target'])
  public onClick(ev: HTMLElement) {
    if(!ev.classList.contains("appointment")) {
      this._selectedElem.emit(this.day);
    }
  }
  public appointmentClick(el: CalendarAppointment) {
    this._selectedElem.emit(el);
  }
}
