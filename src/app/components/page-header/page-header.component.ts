import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './../settings/settings/settings.component';
import { Location } from '@angular/common';
import { getObjectValues } from 'src/app/utilities/utility-functions';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
    @Input('goBackButton') goBackButton: boolean;
    @Input('title') title = '';
    @Input('fancy') fancyFont: boolean = false;
    @Input('showSettings') showSettings: boolean = false;

    constructor(
        private location: Location,
        private dialog: MatDialog    
    ) { }

    ngOnInit(): void {
    }

    goBack() {
        this.location.back();
    }

    openSettings() {
        const dialogRef = this.dialog.open(SettingsComponent);

        return dialogRef.afterClosed();
    }
}
