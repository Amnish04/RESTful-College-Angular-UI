import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css']
})
export class YesNoModalComponent implements OnInit {
    dialogTitle: string;
    yesTitle: string;
    noTitle: string;

    constructor(
        public dialogRef: MatDialogRef<YesNoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {}

    ngOnInit(): void {
        this.dialogTitle = this.data?.dialogTitle ?? 'Yes or No?';
        this.yesTitle = this.data?.yesTitle ?? 'Yes';
        this.noTitle = this.data?.noTitle ?? 'No';
    }
}
