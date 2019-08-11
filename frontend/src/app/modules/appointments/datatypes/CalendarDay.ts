import { WeekdayEnum } from './Weekday';
import { CalendarAppointment } from './CalendarAppointment';

export class CalendarDay {

  public day: number;
  public month: number;
  public year: number;
  public weekday: WeekdayEnum;

  constructor(dateComps: number[], weekday?: WeekdayEnum) {
    if (dateComps.length != 3) throw new Error("Day could not be constructed, wrong number of parameters.");
    this.day = dateComps[0];
    this.month = dateComps[1];
    this.year = dateComps[2];
    this.weekday = weekday;
  }

  public isIn(appo: CalendarAppointment): boolean {
    if (this.year >= appo.start.date.year &&
      this.month >= appo.start.date.month &&
      this.day >= appo.start.date.day &&
      this.year <= appo.end.date.year &&
      this.month <= appo.end.date.month &&
      this.day <= appo.end.date.day) {
      return true;
    }
    else return false;
  }

  public toDotFormat(): string {
    return this.day + "." + this.month + "." + this.year;
  }
}