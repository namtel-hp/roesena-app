import { CalendarDay } from './CalendarDay';

export class CalendarAppointment {

  constructor(
    public title: string,
    public description: string,
    public start: {date: CalendarDay, time: string},
    public end: {date: CalendarDay, time: string}
  ) { }

}