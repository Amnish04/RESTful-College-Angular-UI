import { YesNoModalComponent } from './../../yes-no-modal/yes-no-modal.component';
import { CourseService } from './../../../services/courses/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorTypes, ResponseStatuses } from './../../../utilities/enums';
import { getCopy, getErrorMessage, isDefNotNull } from 'src/app/utilities/utility-functions';
import { Course } from './../../../models/course.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent implements OnInit {

    isEdit: boolean;
    editing: boolean = false;
    courseForm: FormGroup;

    get pageTitle(): string {
        return  this.isEdit ? `${this.editing ? 'Edit' : ''} ${this.course?.courseCode ?? ''} - ${this.course?.courseDescription ?? ''}` : 'Add Course';
    }

    maxCourseDescLength = 50;
    maxCourseCodeLength = 8;

    course: Course = new Course();

    errorMessages = {
        courseCode: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Course Code'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Course Code', {maxlength: this.maxCourseCodeLength})
        },
        courseDescription: {
            messageRequired: getErrorMessage(ErrorTypes.Required, 'Course Description'),
            messageLength: getErrorMessage(ErrorTypes.MaxLength, 'Course Description', {maxlength: this.maxCourseDescLength})
        },
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private courseService: CourseService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.isEdit = this.activatedRoute.snapshot.queryParams['mode'] === 'edit';

        // Gets the course and intializes the form
        this.getCourse();
    }

    // To be called when student is fetched and initialized
    initForm() {
        this.courseForm = this.formBuilder.group({
            courseCode: [this.course.courseCode, 
                [Validators.required, Validators.maxLength(this.maxCourseCodeLength)]],
            courseDescription: [this.course.courseDescription, 
                [Validators.required, Validators.maxLength(this.maxCourseDescLength)]],
        });
    }

    // Fetch concerned course info and initialize the form
    getCourse() {
        if (this.isEdit) {
            let id = Number(this.activatedRoute.snapshot.params['id']);
            this.courseService.getCourseById(id)
            .subscribe((data: any) => {
                this.course = getCopy(data) ?? new Course();
                this.initForm();
            });
        } else this.initForm();
        
    }

    resetControls() {
        // Could have used setValue as well since we are setting all the controls, but patchValue is a safer option
        this.courseForm.patchValue({
            courseCode: this.course.courseCode,
            courseDescription: this.course.courseDescription,
        });
    }

    onCancelEdit() {
        if (this.isEdit) {

            this.editing = false;
            this.courseForm.markAsPristine();
            this.resetControls();
        } else { // Add student is open
            this.location.back();
        }
    }

    onSaveClick() {
        this.updateCourse();
        if (this.isEdit) {
        
            // API Call
            this.courseService.updateCourse(this.course)
            .subscribe((res: any) => this.courseResponseHandler(res));
    
            this.editing = false;
        } else {
            this.courseService.addCourse(this.course)
            .subscribe((res: any) => this.courseResponseHandler(res));
        }
    }
    
    onDelete() {
        this.openDialog()
        .subscribe(response => {
            if (response === true) {
                this.courseService.deleteCourse(Number(this.course.courseId))
                .subscribe((res: any) => this.courseResponseHandler(res));
            }
        });
    }

    courseResponseHandler(res: any) {
        switch (res.status) {
            case ResponseStatuses.Success:
                this.courseService.dataChanged = true;
                this.openSnackBar(res.message);
                break;
            case ResponseStatuses.Profanity:
                if (isDefNotNull(res.data.foundNames)) {
                    // Basic check was passed
                    this.openSnackBar(`${res.data.foundNames.join(", ")} ${res.data.foundNames.length > 1 ? 'wicho koi ' : ''}teri Maa hai?`);
                }
                else {
                    // Advanced Check was passed
                    let message = `Profanity not allowed. ${res.data['bad-words-total']} word${res.data['bad-words-total'] > 1 ? 's' : ''} found!`
                    this.openSnackBar(message);
                }
                break;
            case ResponseStatuses.Failure:
                this.openSnackBar(`Error ${res.code}: ${res.message ?? 'Unexpected Error'}`);
                break;
        }
        this.router.navigateByUrl('courses');
    }

    get saveDisabled() {
        return !this.courseForm.valid || !this.courseForm.dirty;
    }

    updateCourse() {
        this.course.courseCode = this.courseForm.value.courseCode;
        this.course.courseDescription = this.courseForm.value.courseDescription;
    }

    openDialog() {
        const dialogRef = this.dialog.open(YesNoModalComponent, {
            data: {
                dialogTitle: 'Are you sure you want to delete?',
                yesTitle: 'Delete',
                noTitle: 'Cancel'
            }
        });

        return dialogRef.afterClosed();
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, "OK", {
            duration: 1000 * 5,
            panelClass: ['mat-toolbar', 'mat-primary'],
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
        });
    }
}
