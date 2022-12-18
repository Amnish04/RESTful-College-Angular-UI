import { Location } from '@angular/common';
import { StudentService } from './../../../services/students/student-service.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { getCopy, getErrorMessage } from 'src/app/utilities/utility-functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorTypes } from 'src/app/utilities/enums';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
    isEdit: boolean;
    editing: boolean = false;
    studentForm: FormGroup;

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

    errorMessages = {
        firstName: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'First Name'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'First Name', {maxlength: 20})
        },
        lastName: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Last Name'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Last Name', {maxlength: 30})
        },
    };

    constructor(private activatedRoute: ActivatedRoute,
        private studentService: StudentService,
        private location: Location,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        // No need for dynamic params
        // this.activatedRoute.queryParams.subscribe(params => {
        //     this.isEdit = params['mode'] === 'edit';
        // });

        this.isEdit = this.activatedRoute.snapshot.queryParams['mode'] === 'edit';

        this.getStudent(true);
    }

    // To be called when student is fetched and initialized
    initForm() {
        this.studentForm = this.formBuilder.group({
            firstName: [this.student.firstName, 
                [Validators.required, Validators.maxLength(20)]],
            lastName: [this.student.lastName, 
                [Validators.required, Validators.maxLength(40)]],
        });
        
        this.studentForm.valueChanges
        .subscribe(changes => {
            console.log(this.studentForm.get('firstName')?.errors);
        });
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
            this.initForm();
        } else {
            this.studentService.getStudents()
            .subscribe(data => {
                this.student = getCopy(data.find(std => std.studentNum === id) ?? new Student());
                this.originalStudent = getCopy(this.student);
                this.initForm();
            });
        }
    }

    resetControls() {
        this.studentForm.patchValue({
            firstName: this.student.firstName,
            lastName: this.student.lastName,
        });
    }

    onCancelEdit() {
        if (this.isEdit) {
            this.student = getCopy(this.originalStudent);

            this.editing = false;
            this.resetControls();
        } else { // Add student is open
            this.location.back();
        }
    }

    onSaveClick() {
        console.log("Submitting");
    }

    onDelete() {
        this.studentService.deleteStudent(this.student.studentNum);
    }

    get saveDisabled() {
        return !this.studentForm.valid;
    }
}
