import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  constructor(public auth: AuthService) {}

  public onSubmit() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
