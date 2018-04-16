import { ElementRef, Directive } from "@angular/core";

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {
  constructor(
    private _elementRef: ElementRef
  ) {     
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.scrollIntoView({block: "end", behavior: "smooth"});
  }
}