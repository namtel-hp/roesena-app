import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "../interfaces";

@Injectable({ providedIn: "root" })
export class CalendarEventsResolver implements Resolve<appEvent> {
  constructor(private firestore: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // get items where end date is after the first of the month
    return (!route.paramMap.get("id")
      ? this.firestore.collection("events", ref =>
          ref.where("endDate", ">=", new Date(new Date().getFullYear(), new Date().getMonth(), 1))
        )
      : this.firestore.collection("events", ref =>
          ref.where(
            "endDate",
            ">=",
            new Date(new Date(route.paramMap.get("id")).getFullYear(), new Date(route.paramMap.get("id")).getMonth(), 1)
          )
        )
    )
      .get()
      .pipe(
        map(querySnapshot => {
          // map the data to appEvents
          let data: any[] = querySnapshot.docs.map(doc => {
            let data: any = doc.data();
            data.id = doc.id;
            data.startDate = new Date(data.startDate.toDate());
            data.endDate = new Date(data.endDate.toDate());
            return data;
          });
          // filter out the events that start after the month
          data = data.filter(el =>
            !route.paramMap.get("id")
              ? el.startDate <= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
              : el.startDate <=
                new Date(new Date(route.paramMap.get("id")).getFullYear(), new Date(route.paramMap.get("id")).getMonth() + 1, 0)
          );
          return data;
        })
      );
  }
}
