export enum WeekdayEnum {
  monday = "Montag",
  tuesday = "Dienstag",
  wednesday = "Mittwoch",
  thursday = "Donnerstag",
  friday = "Freitag",
  saturday = "Samstag",
  sunday = "Sonntag"
}

export function getWeekdayByNumber(index: number): WeekdayEnum {
  switch(index) {
    case 0: return WeekdayEnum.monday;
    case 1: return WeekdayEnum.tuesday;
    case 2: return WeekdayEnum.wednesday;
    case 3: return WeekdayEnum.thursday;
    case 4: return WeekdayEnum.friday;
    case 5: return WeekdayEnum.saturday;
    case 6: return WeekdayEnum.sunday;
  }
}