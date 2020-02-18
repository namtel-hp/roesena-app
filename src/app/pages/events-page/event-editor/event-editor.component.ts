import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-event-editor",
  templateUrl: "./event-editor.component.html",
  styleUrls: ["./event-editor.component.scss"]
})
export class EventEditorComponent {
  @ViewChild("startDateTemplate")
  private startDateRef: ElementRef;
  @ViewChild("endDateTemplate")
  private endDateRef: ElementRef;
  @ViewChild("startTimeTemplate")
  private startTimeRef: ElementRef;
  @ViewChild("endTimeTemplate")
  private endTimeRef: ElementRef;

  public editingEvent: appEvent = {
    title: "",
    id: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    authLevel: 0
  };

  constructor(
    private firestore: AngularFirestore,
    public route: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    // this.auth.currentUser.then(user => (this.editingEvent.roles[user.uid] = "owner"));
    // this.editingEvent.roles[auth.]
    if (this.route.snapshot.paramMap.get("id")) {
      // save already existing event in here so it can be edited
      this.editingEvent = route.snapshot.data.appEvent as appEvent;
    }
  }

  public get startDate(): string {
    return `${this.editingEvent.startDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(this.editingEvent.startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${this.editingEvent.startDate.getFullYear()}`;
  }

  public set startDate(val: string) {
    if (this.startDateRef.nativeElement.checkValidity()) {
      const parts: number[] = val.split(".").map(el => parseInt(el));
      this.editingEvent.startDate.setDate(parts[0]);
      this.editingEvent.startDate.setMonth(parts[1] - 1);
      this.editingEvent.startDate.setFullYear(parts[2]);
    }
  }

  public get endDate(): string {
    return `${this.editingEvent.endDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(this.editingEvent.endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${this.editingEvent.endDate.getFullYear()}`;
  }

  public set endDate(val: string) {
    if (this.endDateRef.nativeElement.checkValidity()) {
      const parts: number[] = val.split(".").map(el => parseInt(el));
      this.editingEvent.endDate.setDate(parts[0]);
      this.editingEvent.endDate.setMonth(parts[1] - 1);
      this.editingEvent.endDate.setFullYear(parts[2]);
    }
  }

  public get startTime(): string {
    return `${this.editingEvent.startDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${this.editingEvent.startDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  public get endTime(): string {
    return `${this.editingEvent.endDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${this.editingEvent.endDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  public set startTime(val: string) {
    if (this.startTimeRef.nativeElement.checkValidity()) {
      const parts: number[] = val.split(":").map(el => parseInt(el));
      this.editingEvent.startDate.setHours(parts[0], parts[1]);
    }
  }

  public set endTime(val: string) {
    if (this.endTimeRef.nativeElement.checkValidity()) {
      const parts: number[] = val.split(":").map(el => parseInt(el));
      this.editingEvent.endDate.setHours(parts[0], parts[1]);
    }
  }

  public saveEvent(): void {
    // delete id to not safe it as extra field in the firestore document
    delete this.editingEvent.id;
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
