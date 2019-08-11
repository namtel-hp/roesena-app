import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fancy-switch',
  templateUrl: './fancy-switch.component.html',
  styleUrls: ['./fancy-switch.component.scss']
})
export class FancySwitchComponent implements OnInit {

  isChecked: boolean;

  @Input("label")
  labelText: string;

  @Input()
  get checked() {
    return this.isChecked;
  }

  @Output()
  checkedChange = new EventEmitter<boolean>();

  set checked(val: boolean) {
    this.isChecked = val;
    this.checkedChange.emit(this.isChecked);
  }

  constructor() { }

  ngOnInit() { }
}