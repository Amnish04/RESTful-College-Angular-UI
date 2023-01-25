import { ButtonSounds } from './../../utilities/enums';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService implements OnInit {
    private buttonSoundPath = '../../assets/soundEffects/ButtonClick3.mp3';
    private buttonSound = new Audio(this.buttonSoundPath);
    constructor() { }

    ngOnInit(): void {
        this.loadSounds();
    }

    loadSounds() {
        this.buttonSound.load();
    }

    setButtonSound(sound: any) {
        switch(sound) {
            case ButtonSounds.Sound1:
                this.buttonSoundPath = '../../assets/soundEffects/ButtonClick1.mp3';
                
                break;
            case ButtonSounds.Sound2:
                this.buttonSoundPath = '../../assets/soundEffects/ButtonClick2.mp3';
                break;
            case ButtonSounds.Sound3:
                this.buttonSoundPath = '../../assets/soundEffects/ButtonClick3.mp3';
                break;
        }
        this.buttonSound = new Audio(this.buttonSoundPath);
        this.buttonSound.load();
        console.log(this.buttonSoundPath)
    }

    playButtonSound() {
        if (!this.buttonSound.ended) {
            new Audio(this.buttonSoundPath).play();
        } else {
            this.buttonSound.play();
        }
    }
}
