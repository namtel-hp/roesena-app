import { Component, OnInit } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  public events: Observable<appEvent[]>;

  constructor(firestore: AngularFirestore, private router: Router, auth: AngularFireAuth) {
    auth.currentUser.then(user => {
      this.events = combineLatest(
        firestore
          .collection<appEvent>("events", qFn => qFn.where(`roles.${user.uid}`, "in", ["reader", "writer", "owner"]))
          .snapshotChanges(),
        firestore
          .collection<appEvent>("events", qFn => qFn.where(`roles.isPublic`, "==", true))
          .snapshotChanges()
      ).pipe(
        // combine the arrays
        map(events => {
          let [publicEvents, myEvents] = events;
          return [...publicEvents, ...myEvents];
        }),
        // map the time string to a js date and the id
        map(changeActions => {
          return changeActions.map(action => {
            let data: any = action.payload.doc.data();
            data.id = action.payload.doc.id;
            data.startDate = new Date(data.startDate.toDate());
            data.endDate = new Date(data.endDate.toDate());
            return data;
          });
        }),
        // remove duplicates
        map(events => {
          return events.filter((item: appEvent, index) => events.findIndex(el => el.id === item.id) === index);
        })
      );
    });
  }

  ngOnInit(): void {}

  public editEvent(ev: appEvent): void {
    this.router.navigate(["events", "edit", ev.id]);
  }
}
