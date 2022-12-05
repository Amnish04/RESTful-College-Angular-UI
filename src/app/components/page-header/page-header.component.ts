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

    constructor(private location: Location) { }

    ngOnInit(): void {
    }

    goBack() {
        this.location.back();
    }

}
