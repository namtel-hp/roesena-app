import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CalendarAppointment } from '../../modules/appointments/datatypes/CalendarAppointment';
import { CalendarEvent } from 'src/app/modules/appointments/datatypes/CalendarEvent';
import { CalendarDay } from 'src/app/modules/appointments/datatypes/CalendarDay';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient) { }

  public getAppointments(title?: string): Observable<(CalendarEvent | CalendarAppointment) []> {
    return this._http.get<any []>('/api/appointments/' + (title ? title : '*'), this._header)
      .pipe(
        map( list => 
          list.map( el => {
            if(el.participants) {
              return new CalendarEvent(
                el.title,
                el.description,
                { date: new CalendarDay([+el.startDay, +el.startMonth, +el.startYear]), time: el.startTime },
                { date: new CalendarDay([+el.endDay, +el.endMonth, +el.endYear]), time: el.endTime },
                el.participants,
                new CalendarDay([el.deadlineDay, el.deadlineMonth, el.deadlineYear])
              );
            } else {
              return new CalendarAppointment(el.title,
                el.description,
                { date: new CalendarDay([+el.startDay, +el.startMonth, +el.startYear]), time: el.startTime },
                { date: new CalendarDay([+el.endDay, +el.endMonth, +el.endYear]), time: el.endTime },);
            }
          })
        ),
        catchError( e => throwError(e) )
      );
  }

  /**
   * add a new appointment to the list and sent it to the server\
   * __is only sent on subscribing!__
   * @param {(CalendarAppointment | CalendarEvent)} appo
   * @returns {(Observable<CalendarAppointment | CalendarEvent>)}
   * @memberof HttpService
   */
  public addAppointment(appo: CalendarAppointment | CalendarEvent): Observable<CalendarAppointment | CalendarEvent> {
    return this._http.post<CalendarAppointment | CalendarEvent>("/api/appointments", appo, this._header)
      .pipe(
        catchError( e => throwError(e) )
      );
  }

  public getPerson(name?: string): Observable<string[]> {
    return this._http.get<string[]>("/api/person/" + (name ? name : "*"), this._header).pipe( catchError( e => throwError(e)));
  }

  public replaceAppointment(oldTitle: string, appo: CalendarAppointment): Observable<CalendarAppointment> {
    return this._http.put<CalendarAppointment>("/api/appointments/" + oldTitle, appo, this._header)
      .pipe(
        catchError( e => throwError(e) )
      );
  }
}
