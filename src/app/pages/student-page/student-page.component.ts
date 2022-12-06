import { StudentService } from './../../services/students/student-service.service';
import { Component, OnInit } from '@angular/core';
import { Students } from 'src/app/models/student.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

    pageTitle: string = 'Students Page';
    students: Students = [];

    constructor(
        private studentService: StudentService
    ) { }

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents() {
        if (!this.studentService.cachedStudents || this.studentService.dataChanged) {
            this.studentService.getStudents()
            .subscribe(data => {
                this.students = data;
            });
        } else {
            this.students = this.studentService.cachedStudents;
        }
    }

}
