import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "../interfaces";

@Injectable({ providedIn: "root" })
export class EventResolver implements Resolve<appEvent> {
  constructor(private firestore: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.firestore
      .collection("events")
      .doc(route.paramMap.get("id"))
      .get()
      .pipe(
        map(doc => {
          let data = doc.data();
          data.id = doc.id;
          data.startDate = new Date(data.startDate.toDate());
          data.endDate = new Date(data.endDate.toDate());
          return data;
        })
      );
  }
}
