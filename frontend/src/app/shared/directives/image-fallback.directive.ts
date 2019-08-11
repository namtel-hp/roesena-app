import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img',
  host: {
    '(error)': 'setDefault()',
    '(load)': 'loaded()'
  }
})
export class ImageFallbackDirective {
  constructor(private _selfRef: ElementRef) {
    (this._selfRef.nativeElement as HTMLElement).style.transition = 'all linear .4s';
    (this._selfRef.nativeElement as HTMLElement).style.opacity = '0';
  }

  public setDefault() {
    this._selfRef.nativeElement.src = 'assets/svg/RöSeNa.svg';
  }

  public loaded() {
    (this._selfRef.nativeElement as HTMLElement).style.opacity = '1';
  }
}
