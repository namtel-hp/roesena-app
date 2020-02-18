import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";

import { appEvent } from "src/app/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.component.html",
  styleUrls: ["./start-page.component.scss"]
})
export class StartPageComponent {
  public eventForCard: Observable<appEvent>;

  constructor(route: ActivatedRoute) {
    this.eventForCard = route.snapshot.data.appEvent;
  }
}
