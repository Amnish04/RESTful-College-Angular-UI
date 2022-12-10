import { Location } from '@angular/common';
import { StudentService } from './../../../services/students/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { getCopy } from 'src/app/utilities/utility-functions';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
    isEdit: boolean;
    editing: boolean = false;

    get pageTitle(): string {
        return  this.isEdit ? `${this.editing ? 'Edit' : ''} Student: ${this.student?.firstName ?? ''} ${this.student?.lastName ?? ''} - ${this.student?.studentNum ?? ''}` : 'Add Student';
    }

    originalStudent: Student = new Student();
    student: Student = new Student();

    // Hard coded for now
    courses = [
        { courseId: null, name: 'SelectCourse'},
        { courseId: 1, name: 'OOP345'},
        { courseId: 2, name: 'WEB322'},
    ]; 

    constructor(private activatedRoute: ActivatedRoute,
        private studentService: StudentService,
        private location: Location) { }

    ngOnInit(): void {
        // No need for dynamic params
        // this.activatedRoute.queryParams.subscribe(params => {
        //     this.isEdit = params['mode'] === 'edit';
        // });

        this.isEdit = this.activatedRoute.snapshot.queryParams['mode'] === 'edit';

        this.getStudent(true);
    }
    
    getStudent(cached: boolean = false) {
        this.getStudentInfo(
            Number(this.activatedRoute.snapshot.params['id']), cached
        );
    }

    getStudentInfo(id: number, cached: boolean = false): void {
        if (this.studentService.cachedStudents.length && cached) {
            this.student = getCopy(this.studentService.cachedStudents?.find(std => std.studentNum === id) ?? new Student());
            this.originalStudent = getCopy(this.student);
        } else {
            this.studentService.getStudents()
            .subscribe(data => {
                this.student = getCopy(data.find(std => std.studentNum === id) ?? new Student());
                this.originalStudent = getCopy(this.student);
            });
        }
    }

    onCancelEdit() {
        if (this.isEdit) {
            this.student = getCopy(this.originalStudent);

            this.editing = false;
        } else {
            this.location.back();
        }
    }

    onSaveClick() {
    }

    onDelete() {
        this.studentService.deleteStudent(this.student.studentNum);
    }
}
