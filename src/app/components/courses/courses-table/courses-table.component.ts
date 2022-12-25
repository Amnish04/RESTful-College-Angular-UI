import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
    @Input('courses') courses: any;
    constructor() { }

    ngOnInit(): void {
    }

}
