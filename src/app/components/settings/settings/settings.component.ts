import { SoundService } from './../../../services/audio/sound.service';
import { Subscription } from 'rxjs';
import { Settings, ButtonSounds } from './../../../utilities/enums';
import { YesNoModalComponent } from './../../yes-no-modal/yes-no-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
    @ViewChild('closeButton') closeButton: ElementRef;
    activatedTab = Settings.Audio;

    // For template
    Settings = Settings; 
    ButtonSounds = ButtonSounds;
    
    controlSubscription: Subscription;
    soundControl = new FormControl('');

    constructor(
        public dialogRef: MatDialogRef<YesNoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private soundService: SoundService
    ) { }

    ngOnInit(): void {
        this.controlSubscription = this.soundControl.valueChanges
        .subscribe((sound) => {
            this.soundService.setButtonSound(sound);
        });
    }

    closeModal() {
        this.closeButton.nativeElement.click();
    }

    settingTabSelection(selection: any) {
        this.activatedTab = selection.value;
    }

    ngOnDestroy(): void {
        this.controlSubscription?.unsubscribe();
    }
}
