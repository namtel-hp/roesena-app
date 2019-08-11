import { CalendarAppointment } from './CalendarAppointment';
import { CalendarDay } from './CalendarDay';

export class CalendarEvent extends CalendarAppointment {

  constructor(
    title: string,
    description: string,
    public start: {date: CalendarDay, time: string},
    public end: {date: CalendarDay, time: string},
    public participants: {name: string, response: number}[],
    public deadline: CalendarDay
    ) {
    super(title, description, start, end);
  }

  getAcceptedCount(): number {
    var sum: number = 0;
    this.participants.forEach( el => sum += (el.response ? +el.response : 0) );
    return sum;
  }
}