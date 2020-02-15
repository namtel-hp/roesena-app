import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.component.html",
  styleUrls: ["./start-page.component.scss"]
})
export class StartPageComponent {
  public eventForCard: Observable<appEvent>;

  constructor(firestore: AngularFirestore) {
    this.eventForCard = firestore
      .collection("events", ref =>
        ref
          .where("endDate", ">", new Date())
          .orderBy("endDate")
          .limit(1)
      )
      .get()
      .pipe(
        filter(res => res.docs.length > 0),
        map(res => {
          let data = res.docs[0].data();
          data.id = res.docs[0].id;
          data.startDate = data.startDate.toDate();
          data.endDate = data.endDate.toDate();
          return data as appEvent;
        })
      );
  }
}
