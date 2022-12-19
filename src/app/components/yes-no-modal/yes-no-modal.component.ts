import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css']
})
export class YesNoModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<YesNoModalComponent>,
      ) {}

    ngOnInit(): void {

    }
}
