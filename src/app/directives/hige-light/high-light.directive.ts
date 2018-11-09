import { Directive, HostBinding, HostListener, ElementRef,Renderer} from '@angular/core';


@Directive({
    selector: '[highLight]'
})

export class HighLightDirective {

    constructor(private el: ElementRef,private renderer:Renderer) { }
    // toggle()
    // {
    //     this.el.nativeElement.style.backgroundColor='red';
    // }
    //this.renderer.setElementStyle
//    this.renderer.setElementStyle(this.el.st);
}