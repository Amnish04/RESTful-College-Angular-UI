import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appSoundOnClick]'
})
export class SoundOnClickDirective implements OnInit {
    audioPath = '../../assets/soundEffects/ButtonClick3.mp3';
    audio = new Audio(
        this.audioPath
    );

    constructor() { }

    ngOnInit(): void {
        this.audio.load();
    }

    @HostListener('click', ['$event'])
    onButtonClick(evt: Event) {
        if (!this.audio.ended) {
            new Audio(this.audioPath).play();
        } else {
            this.audio.play();
        }
    } 
}
