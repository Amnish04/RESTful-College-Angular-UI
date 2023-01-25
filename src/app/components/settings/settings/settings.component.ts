import { YesNoModalComponent } from './../../yes-no-modal/yes-no-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    @ViewChild('closeButton') closeButton: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<YesNoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
    }

    closeModal() {
        this.closeButton.nativeElement.click();
    }
}
