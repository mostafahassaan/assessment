import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

/**
 * Directive that changes the cursor shape when the mouse enters or leaves the element.
 */
@Directive({
  selector: '[appClickable]', 
  standalone: true
})
export class ClickableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * Event handler for the 'mouseenter' event.
   * Sets the cursor to 'pointer'.
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.setCursor('pointer');
  }

  /**
   * Event handler for the 'mouseleave' event.
   * Sets the cursor to 'default'.
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.setCursor('default');
  }

  /**
   * Sets the cursor style for the element.
   * 
   * @param cursor - The cursor style to be set.
   */
  private setCursor(cursor: string) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', cursor);
  }
}
