import { Course, Courses } from './../../../models/course.model';
import { CourseService } from './../../../services/courses/course.service';
import { YesNoModalComponent } from './../../yes-no-modal/yes-no-modal.component';
import { Location } from '@angular/common';
import { StudentService } from './../../../services/students/student-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { getCopy, getErrorMessage } from 'src/app/utilities/utility-functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorTypes } from 'src/app/utilities/enums';
import { update } from 'lodash';
import { MatDialog } from '@angular/material/dialog';

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

    student: Student = new Student();

    // Hard coded for now
    courses: Courses = [
        // { courseId: null, courseCode: 'SelectCourse'},
        // { courseId: 1, courseCode: 'OOP345'},
        // { courseId: 2, courseCode: 'WEB322'},
    ]; 

    errorMessages = {
        firstName: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'First Name'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'First Name', {maxlength: 15})
        },
        lastName: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Last Name'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Last Name', {maxlength: 20})
        },
        email: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Email'),
            messageEmail: getErrorMessage(ErrorTypes.Email, 'Email')
        },
        address: {
            street: {
                messageRequired: getErrorMessage(ErrorTypes.Required, 'Street Address'),
                messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Street Address', {maxlength: 20}),
            },
            city: {
                messageRequired: getErrorMessage(ErrorTypes.Required, 'City'),
                messageLength: getErrorMessage(ErrorTypes.MaxLength, 'City', {maxlength: 15}),
            },
            province: {
                messageRequired: getErrorMessage(ErrorTypes.Required, 'Province'),
                messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Province', {maxlength: 15}),
            },
        },
        status: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Status')
        },
        course: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Course')
        }
    };

    constructor(private activatedRoute: ActivatedRoute,
        private studentService: StudentService,
        private location: Location,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private courseService: CourseService) { }

    ngOnInit(): void {
        this.isEdit = this.activatedRoute.snapshot.queryParams['mode'] === 'edit';

        // Gets the student and intializes the form
        this.getStudent(true);
        this.getCourses();
    }

    getCourses() {
        this.courseService.getCourses()
        .subscribe((data: Courses) => {
            this.courses = data;
        });
    }

    // To be called when student is fetched and initialized
    initForm() {
        this.studentForm = this.formBuilder.group({
            firstName: [this.student.firstName, 
                [Validators.required, Validators.maxLength(15)]],
            lastName: [this.student.lastName, 
                [Validators.required, Validators.maxLength(20)]],
            email: [this.student.email, 
                [Validators.required, Validators.email]],
            address: this.formBuilder.group({
                street: [this.student.addressStreet, [Validators.required, Validators.maxLength(25)]],
                city: [this.student.addressCity, [Validators.required, Validators.maxLength(15)]],
                province: [this.student.addressProvince, [Validators.required, Validators.maxLength(15)]]
            }),
            TA: [this.student.TA],
            status: [this.student.status, Validators.required],
            course: [this.student.course, Validators.required]
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
            this.initForm();
        } else {
            this.studentService.getStudents()
            .subscribe(data => {
                this.student = getCopy(data.find(std => std.studentNum === id) ?? new Student());
                this.initForm();
            });
        }
    }

    resetControls() {
        // Could have used setValue as well since we are setting all the controls, but patchValue is a safer option
        this.studentForm.patchValue({
            firstName: this.student.firstName,
            lastName: this.student.lastName,
            email: this.student.email,
            address: {
                street: this.student.addressStreet,
                city: this.student.addressCity,
                province: this.student.addressProvince
            },
            TA: this.student.TA,
            status: this.student.status,
            course: this.student.course
        });
    }

    onCancelEdit() {
        if (this.isEdit) {

            this.editing = false;
            this.studentForm.markAsPristine();
            this.resetControls();
        } else { // Add student is open
            this.location.back();
        }
    }

    onSaveClick() {
        this.updateStudent();
        if (this.isEdit) {
        
            // API Call
            this.studentService.updateStudent(this.student)
            .subscribe((res: any) => {
                if (res.status === 'Success') {
                    this.studentService.dataChanged = true;
                    this.router.navigateByUrl('students');
                }
            });;
    
            this.studentService.dataChanged = true;
            this.editing = false;
        } else {
            this.studentService.addStudent(this.student)
            .subscribe((res: any) => {
                if (res.status === 'Success') {
                    this.studentService.dataChanged = true; // Important for new data to be fetched
                    this.router.navigateByUrl('students');
                }
            });
        }
    }

    onDelete() {
        this.openDialog()
        .subscribe(response => {
            if (response === true) {
                this.studentService.deleteStudent(this.student.studentNum)
                .subscribe((res: any) => {
                    if (res.status === 'Success') {
                        this.studentService.dataChanged = true; // Important for new data to be fetched
                        this.router.navigateByUrl('students');
                    }
                });
            }
        });
    }

    get saveDisabled() {
        return !this.studentForm.valid || !this.studentForm.dirty;
    }

    updateStudent() {
        this.student.firstName = this.studentForm.value.firstName;
        this.student.lastName = this.studentForm.value.lastName;
        this.student.email = this.studentForm.value.email;
        this.student.addressStreet = this.studentForm.value.address.street;
        this.student.addressCity = this.studentForm.value.address.city;
        this.student.addressProvince = this.studentForm.value.address.province;
        this.student.TA = !!this.studentForm.value.TA; // Convert to a boolean
        this.student.status = this.studentForm.value.status;
        this.student.course = this.studentForm.value.course;
    }

    openDialog() {
        const dialogRef = this.dialog.open(YesNoModalComponent, {
            data: {
                dialogTitle: 'Are you sure you want to delete?'
            }
        });

        return dialogRef.afterClosed();
    }
}
