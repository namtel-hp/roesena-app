import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[rsnAutosizeSvg]'
})
export class AutosizeSvgDirective {

  constructor(private _selfRef: ElementRef) {
    (this._selfRef.nativeElement as HTMLElement).style.height = (this._selfRef.nativeElement as HTMLElement).style.width = "3vh";
    (this._selfRef.nativeElement as HTMLElement).style.margin = "1vh";
    (this._selfRef.nativeElement as HTMLElement).style.outline = "none";
  }

}
