import { Course, Courses } from './../../../models/course.model';
import { SortTypes } from './../../../utilities/enums';
import { Student } from './../../../models/student.model';
import { getObjectValues, isDefNotNull } from 'src/app/utilities/utility-functions';
import { TableColumns } from './../../../models/tabel.model';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { floor } from 'lodash';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit, OnChanges {
    tableTitle: string = 'Courses Data';

    @Input('courses') courses: any;

    colDefs: TableColumns = [
        {title: 'ID', field: 'courseId', sortable: true, sorted: null},
        {title: 'Course', field: 'courseCode', sortable: true, sorted: null},
        {title: 'Description', field: 'courseDescription', sortable: true, sorted: null},
    ];

    constructor() {}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['courses'] && isDefNotNull(this.courses)) {
            this.displayedCourses = this.getPagedData(this.courses, this.pageNumber);
        }
    }

    // For the table
    formatCourseData(course: Course) {
        return {
            courseId: course.courseId,
            courseCode: course.courseCode,
            courseDescription: course.courseDescription,
        }
    }

    // To be used in template
    getObjectValues = getObjectValues;

    sortColumnByField(fieldName: string) {
        let column = this.colDefs.find(col => col.field === fieldName);

        if (column?.sortable && (column?.sorted || column?.sorted === null)) { // Stupid TS step
            if (column.sorted === SortTypes.Ascending) {
                // Sort in descending
                (this.displayedCourses as any).sort((a: any, b: any) => {
                    return a[fieldName] < b[fieldName] ? 1 : a[fieldName] > b[fieldName] ? -1 : 0;
                })
                column.sorted = SortTypes.Descending;
            } else if (column.sorted === null || column.sorted === SortTypes.Descending) {
                // Sort in ascending
                (this.displayedCourses as any).sort((a: any, b: any) => {
                    return a[fieldName] < b[fieldName] ? -1 : a[fieldName] > b[fieldName] ? 1 : 0;
                })
                column.sorted = SortTypes.Ascending;
            }

            // Reset sorted status for all other columns
            this.colDefs.forEach(col => {
                if (col.field !== fieldName) {
                    col.sorted = null;
                }
            })
        }
    }

    //#region pagination
    totalRecords: number;
    recordsPerPage: number = 5;
    pageNumber: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    displayedCourses: Courses;

    getPagedData(data: Courses, pageNumber: number): Courses {
        this.totalRecords = data.length;

        let startIndex = pageNumber * this.recordsPerPage;
        return data.slice(startIndex, startIndex + this.recordsPerPage);
    }

    paginationChanged(info: any) {
        this.pageNumber = info.pageIndex;
        this.displayedCourses = this.getPagedData(this.courses, this.pageNumber);

        this.recordsPerPage = info.pageSize
    }

    //#endregion

}
