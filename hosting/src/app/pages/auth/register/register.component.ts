import { Router } from "@angular/router";
import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnDestroy {
  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-ZäöüÄÖÜ -]+$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });
  private subs: Subscription[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.registerForm.disable();
    this.subs.push(
      this.auth
        .register(
          this.registerForm.get("email").value,
          this.registerForm.get("password").value,
          this.registerForm.get("name").value
        )
        .subscribe({
          next: () => {
            this.registerForm.enable();
            this.router.navigate(["auth", "profile"]);
          },
        })
    );
  }

  getErrorMessage(ctrl: AbstractControl): string {
    if (ctrl.getError("email")) return "Ungültige E-Mail";
    if (ctrl.getError("minlength")) return "Passwort zu kurz";
    if (ctrl.getError("pattern")) return "Ungültige Eingabe";
    if (ctrl.getError("required")) return "Pflichtfeld";
    return "";
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}