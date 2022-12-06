import { PageHeaderComponent } from './../../page-header/page-header.component';
import { StudentService } from './../../../services/students/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from './../../../models/student.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
    isEdit: boolean;

    get pageTitle(): string {
        return  this.isEdit ? `Edit Student: ${this.student?.studentNum ?? ''}` : 'Add Student';
    }

    student: Student | undefined;

    constructor(private activatedRoute: ActivatedRoute,
        private studentService: StudentService) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.isEdit = params['mode'] === 'edit';
        });
        this.getStudentInfo(
            Number(this.activatedRoute.snapshot.params['id'])
        );
    }
 
    getStudentInfo(id: number): void {
        if (this.studentService.cachedStudents) {
            this.student = this.studentService.cachedStudents?.find(std => std.studentNum === id);
        } else {
            this.studentService.getStudents()
            .subscribe(data => {
                this.student = data.find(std => std.studentNum === id);
            });
        }
        
    }

    get stringifiedStudent() {
        return JSON.stringify(this.student);
    }

}
