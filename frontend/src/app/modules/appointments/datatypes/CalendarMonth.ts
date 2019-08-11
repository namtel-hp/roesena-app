import { WeekdayEnum, getWeekdayByNumber } from './Weekday';
import { CalendarDay } from './CalendarDay';

export class CalendarMonth {

  public days: CalendarDay[];
  public month: number;
  public year: number;

  constructor(month: number, year: number, dayCount: number, public firstWeekday: WeekdayEnum) {
    this.month = month;
    this.year = year;
    this.days = Array(dayCount).fill(undefined).map((_, i) => {
      return new CalendarDay([i + 1, this.month, this.year], getWeekdayByNumber((i + this.toWeekdayNumber(firstWeekday)) % 7));
    });
  }

  public toWeekdayNumber(firstWeekday?: WeekdayEnum) {
    switch (firstWeekday ? firstWeekday : this.days[0].weekday) {
      case WeekdayEnum.monday: return 0;
      case WeekdayEnum.tuesday: return 1;
      case WeekdayEnum.wednesday: return 2;
      case WeekdayEnum.thursday: return 3;
      case WeekdayEnum.friday: return 4;
      case WeekdayEnum.saturday: return 5;
      case WeekdayEnum.sunday: return 6;
    }
  }

  public getGridAreaPlace(ind: number): string {
    const row = Math.floor((this.toWeekdayNumber() + ind) / 7) + 3;
    const column = this.toWeekdayNumber(this.days[ind].weekday) + 2;
    return `${row} / ${column} / ${row} / ${column}`;
  }

  // maybe should be changed to start with 0, because months in "Date" class start months at 0
  public getMonthAsString(): string {
    switch (this.month) {
      case 1: return "Januar";
      case 2: return "Februar";
      case 3: return "März";
      case 4: return "April";
      case 5: return "Mai";
      case 6: return "Juni";
      case 7: return "Juli";
      case 8: return "August";
      case 9: return "September";
      case 10: return "Oktober";
      case 11: return "November";
      case 12: return "Dezember";
    }
  }
}