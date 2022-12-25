import { Courses } from './../../models/course.model';
import { CourseService } from './../../services/courses/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
    pageTitle: string = 'Courses Page';
    courses: Courses;

    constructor(
        private courseService: CourseService
    ) { }

    ngOnInit(): void {
        this.getCoursesData();
    }

    getCoursesData() {
        this.courseService.getCourses()
        .subscribe((courseData: Courses) => {
            this.courses = courseData;
        });
    }
}
