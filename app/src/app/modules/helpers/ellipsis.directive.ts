import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  standalone: true
})
export class EllipsisDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const el = this.el.nativeElement;
    let text = el.innerText;

    while (el.scrollHeight > el.offsetHeight) {
      text = text.slice(0, -1);
      el.innerText = text + '...';
    }
  }
}
