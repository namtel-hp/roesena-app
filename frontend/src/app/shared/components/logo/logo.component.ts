import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logo-roesena',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() { }

  public linkHome() {
    this._router.navigate([""]);
  }
}
