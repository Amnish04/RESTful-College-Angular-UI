import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appClickOnKey]'
})
export class ClickOnKeyDirective implements OnInit {

    @Input('clickableKeys') keys: number[];

    constructor(private el: ElementRef,
        private renderer: Renderer2) { }

    ngOnInit(): void {

        this.renderer.listen(this.el.nativeElement, 'keydown', (e: KeyboardEvent) => {
            const enterKeyCode = 13;
            const spaceKeyCode = 32;
            
            if (this.keys?.includes(e.keyCode) || (!this.keys && (e.keyCode === enterKeyCode || e.keyCode === spaceKeyCode))) {
                e.preventDefault();
                this.el.nativeElement.click();
            }
        })
    }
}
