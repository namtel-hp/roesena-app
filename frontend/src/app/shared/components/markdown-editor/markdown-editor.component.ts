import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rsn-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

  @Output()
  private _out: EventEmitter<string> = new EventEmitter<string>();

  public rawInput: string;

  set inp(val: string) {
    this.rawInput = val;
    this._out.emit(this.rawInput);
  }
  @Input()
  get inp() {
    return this.rawInput;
  }

  constructor() { }

  ngOnInit() {
  }

}
