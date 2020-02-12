import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  public events: Observable<appEvent[]>;

  constructor(firestore: AngularFirestore, private router: Router) {
    this.events = firestore
      .collection<appEvent>("events")
      .snapshotChanges()
      .pipe(
        // map the time string to a js date and the id
        map(changeActions => {
          return changeActions.map(action => {
            let data: any = action.payload.doc.data();
            data.id = action.payload.doc.id;
            data.startDate = new Date(data.startDate.toDate());
            data.endDate = new Date(data.endDate.toDate());
            return data;
          });
        })
      );
  }

  ngOnInit(): void {}

  public editEvent(ev: appEvent): void {
    this.router.navigate(["events", "edit", ev.id]);
  }
}
