import { StudentService } from './../../../services/students/student-service.service';
import { SortTypes } from './../../../utilities/enums';
import { TableColumns } from './../../../models/tabel.model';
import { Student } from './../../../models/student.model';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { getObjectValues, isDefNotNull } from 'src/app/utilities/utility-functions';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit, OnChanges {
    tableTitle: string = 'Students Data';

    colDefs: TableColumns = [
        {title: 'Student Num', field: 'studentNum', sortable: true, sorted: null},
        {title: 'Name', field: 'name', sortable: true, sorted: null},
        {title: 'Email', field: 'email', sortable: true, sorted: null},
        {title: 'Address', field: 'address', sortable: true, sorted: null},
        {title: 'Status', field: 'status', sortable: true, sorted: null},
        {title: 'Course ID', field: 'courseId', sortable: true, sorted: null}, 
    ];

    @Input('studentData') studentData: any;

    constructor() {}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['studentData'] && isDefNotNull(this.studentData)) {
            this.studentData = this.studentData.map((student: Student) => this.formatStudentData(student));
        }
    }

    formatStudentData(data: Student) {
        return {
            studentNum: data.studentNum,
            name: data.firstName + " " + data.lastName,
            email: data.email,
            address: `${data.addressStreet ?? ''}, ${data.addressCity ?? ''}, ${data.addressProvince ?? ''}`,
            status: data.status,
            courseId: data.course
        };
    }

    // To be used in template
    getObjectValues = getObjectValues;

    sortColumnByField(fieldName: string) {
        let column = this.colDefs.find(col => col.field === fieldName);

        if (column?.sortable && (column?.sorted || column?.sorted === null)) { // Stupid TS step
            if (column.sorted === SortTypes.Ascending) {
                // Sort in descending
                (this.studentData as any).sort((a: any, b: any) => {
                    return a[fieldName] < b[fieldName] ? 1 : a[fieldName] > b[fieldName] ? -1 : 0;
                })
                column.sorted = SortTypes.Descending;
            } else if (column.sorted === null || column.sorted === SortTypes.Descending) {
                // Sort in ascending
                (this.studentData as any).sort((a: any, b: any) => {
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
}
