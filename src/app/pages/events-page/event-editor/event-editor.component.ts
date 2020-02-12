import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";

@Component({
  selector: "app-event-editor",
  templateUrl: "./event-editor.component.html",
  styleUrls: ["./event-editor.component.scss"]
})
export class EventEditorComponent implements OnInit {
  public editingEvent: appEvent = {
    title: "",
    id: "",
    authorityLevel: 0,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    participants: []
  };

  get startDateString(): string {
    return (
      this.editingEvent.startDate
        // get iso date to be timezone neutral
        .toISOString()
        // cut off everything after the minutes
        .slice(0, 16)
    );
  }

  set startDateString(val: string) {
    // put the iso string back into the object on change
    this.editingEvent.startDate = new Date(val);
  }

  get endDateString(): string {
    return (
      this.editingEvent.endDate
        // get iso date to be timezone neutral
        .toISOString()
        // cut off everything after the minutes
        .slice(0, 16)
    );
  }

  set endDateString(val: string) {
    // put the iso string back into the object on change
    this.editingEvent.endDate = new Date(val);
  }

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.route.snapshot.paramMap.get("id")) {
      // save already existing event in here so it can be edited
      this.editingEvent = route.snapshot.data.appEvent as appEvent;
    }
  }

  ngOnInit(): void {}

  public saveEvent(): void {
    if (this.route.snapshot.paramMap.get("id")) {
      // update existing event here
      this.firestore
        .collection("events")
        .doc(this.route.snapshot.paramMap.get("id"))
        .update(this.editingEvent);
    } else {
      // insert new event
      this.firestore.collection("events").add(this.editingEvent);
    }
    this.router.navigate(["events"]);
  }

  public deleteEvent(): void {
    this.firestore
      .collection("events")
      .doc(this.route.snapshot.paramMap.get("id"))
      .delete();
    this.router.navigate(["events"]);
  }
}
