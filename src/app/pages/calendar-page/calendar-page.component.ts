import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { appEvent } from "src/app/interfaces";

@Component({
  selector: "app-calendar-page",
  templateUrl: "./calendar-page.component.html",
  styleUrls: ["./calendar-page.component.scss"]
})
export class CalendarPageComponent implements OnInit {
  public weekdayStrings = [
    { area: "mon", text: "Mo" },
    { area: "tue", text: "Di" },
    { area: "wed", text: "Mi" },
    { area: "thu", text: "Do" },
    { area: "fri", text: "Fr" },
    { area: "sat", text: "Sa" },
    { area: "sun", text: "So" }
  ];
  public dayTemplate: dayTemplateElement[] = [];
  private get date(): Date {
    return this.route.snapshot.paramMap.get("id") ? new Date(this.route.snapshot.paramMap.get("id")) : new Date();
  }
  public get year(): number {
    return this.date.getFullYear();
  }
  public get month(): number {
    return this.date.getMonth();
  }
  public get headerString(): string {
    let d = this.route.snapshot.paramMap.get("id") ? new Date(this.route.snapshot.paramMap.get("id")) : new Date();
    return getMonthName(d) + " " + d.getFullYear();
  }
  public get mondayFirstOffset(): number {
    return new Date(this.year, this.month, 1).getDay() ? new Date(this.year, this.month, 1).getDay() - 1 : 6;
  }

  constructor(private route: ActivatedRoute) {
    console.log(route.snapshot.data);
    const dayAmount = new Date(this.year, this.month + 1, 0).getDate();
    const offset = this.mondayFirstOffset;
    this.dayTemplate = new Array(dayAmount).fill(undefined).map(
      (_, index): dayTemplateElement => {
        const column = new Date(this.year, this.month, index).getDay() + 1;
        const row = Math.floor((offset + index) / 7) + 3;
        return {
          date: index + 1,
          events: this.route.snapshot.data.calendarEvents.filter(
            (event: appEvent) =>
              new Date(event.startDate).getTime() <= new Date(this.year, this.month, index + 1).getTime() &&
              new Date(event.endDate).getTime() >= new Date(this.year, this.month, index + 1).getTime()
          ),
          gridArea: `${row} / ${column} / ${row} / ${column}`
        };
      }
    );
  }

  ngOnInit(): void {}
}

interface dayTemplateElement {
  gridArea: string;
  date: number;
  events: appEvent[];
}

function getMonthName(d: Date): string {
  switch (d.getMonth()) {
    case 0:
      return "Januar";
    case 1:
      return "Februar";
    case 2:
      return "März";
    case 3:
      return "April";
    case 4:
      return "Mai";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "Dezember";
  }
}
