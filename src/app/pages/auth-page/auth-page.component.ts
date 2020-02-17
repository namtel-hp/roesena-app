import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"]
})
export class AuthPageComponent {
  public userInput = {
    email: "",
    password: "",
    name: ""
  };
  constructor(public auth: AuthService, public route: ActivatedRoute) {}
}
