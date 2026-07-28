import { Directive, HostListener, Input, ElementRef } from '@angular/core';

// HANDS-ON 3, Task 3: custom attribute directive.
// @HostListener binds to host events; Angular handles listener cleanup automatically.
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight = 'yellow'; // configurable colour, defaults to yellow

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
