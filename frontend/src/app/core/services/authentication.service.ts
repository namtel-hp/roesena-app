import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedInAs: string = "person 2";

  constructor() { }
}
