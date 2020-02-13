import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";

@Component({
  selector: "app-event-editor",
  templateUrl: "./event-editor.component.html",
  styleUrls: ["./event-editor.component.scss"]
})
export class EventEditorComponent {
  @ViewChild("startDate")
  private startDateRef: ElementRef;
  @ViewChild("startTime")
  private startTimeRef: ElementRef;
  @ViewChild("endDate")
  private endDateRef: ElementRef;
  @ViewChild("endTime")
  private endTimeRef: ElementRef;

  public editingEvent: appEvent = {
    title: "",
    id: "",
    authorityLevel: 0,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    participants: []
  };

  constructor(private firestore: AngularFirestore, public route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.paramMap.get("id")) {
      // save already existing event in here so it can be edited
      this.editingEvent = route.snapshot.data.appEvent as appEvent;
    }
  }

  public saveEvent(startDate: string, startTime: string, endDate: string, endTime: string): void {
    // console.log(el);
    // this.editingEvent.startDate.setDate(this.startDateRef.nativeElement.value.slice(0, 2));
    // this.editingEvent.startDate.setMonth(this.startDateRef.nativeElement.value.slice(3, 5));
    // this.editingEvent.startDate.setFullYear(this.startDateRef.nativeElement.value.slice(6, 10));
    console.log(this.editingEvent);
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
