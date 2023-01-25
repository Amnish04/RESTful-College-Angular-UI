import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appSoundOnClick]'
})
export class SoundOnClickDirective implements OnInit {
    audio = new Audio(
        '../../assets/soundEffects/ButtonClick.mp3'
    );

    constructor() { }

    ngOnInit(): void {
        this.audio.load();
    }

    @HostListener('click', ['$event'])
    onButtonClick(evt: Event) {
        if (!this.audio.ended) {
            new Audio('../../assets/soundEffects/ButtonClick.mp3').play();
        } else {
            this.audio.play();
        }
    } 
}
