import { Component, OnInit, Input } from "@angular/core";
import { appEvent } from "src/app/interfaces";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent implements OnInit {
  @Input()
  public event: appEvent;

  constructor() {}

  ngOnInit(): void {}
}
