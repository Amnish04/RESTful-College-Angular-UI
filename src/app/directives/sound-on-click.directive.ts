import { SoundService } from './../services/audio/sound.service';
import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appSoundOnClick]'
})
export class SoundOnClickDirective implements OnInit {

    constructor(
        private soundService: SoundService
    ) { }

    ngOnInit(): void {
    }

    @HostListener('click', ['$event'])
    onButtonClick(evt: Event) {
        this.soundService.playButtonSound();
    } 
}
