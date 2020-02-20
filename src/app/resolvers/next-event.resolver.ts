import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AngularFirestore, QuerySnapshot, DocumentData } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "../interfaces";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class NextEventResolver implements Resolve<appEvent> {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<appEvent> | Promise<appEvent> | appEvent {
    return this.firestore
      .collection<appEvent>("events", qFn =>
        qFn.where(`authLevel`, "<=", this.auth.$user.getValue() ? this.auth.$user.getValue().authLevel : 0)
      )
      .get()
      .pipe(
        // map documents to events
        map(eventConverter),
        // sort the events
        map(el => el.sort((a, b) => b.endDate.getTime() - a.endDate.getTime())),
        // filter out all the ones that are already over
        map(el => el.filter(val => new Date().getTime() - val.endDate.getTime() > 0)),
        // take the first one of the sorted ones
        map(el => el[0])
      );
  }
}

function eventConverter(snapshot: QuerySnapshot<DocumentData[]>): appEvent[] {
  let data: any[] = snapshot.docs.map(doc => {
    let data: any = doc.data();
    data.id = doc.id;
    data.startDate = new Date(data.startDate.toDate());
    data.endDate = new Date(data.endDate.toDate());
    return data;
  });
  return data;
}
