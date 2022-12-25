import { environment } from './../../../environments/environment';
import { Students, Student } from './../../models/student.model';
import { Injectable } from '@angular/core';
    import { map, Observable, of, pluck, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    dataChanged = true;
    domain: string = environment.apiDomain;

    private endpoints = {
        getStudentsRoute: this.domain + '/students',
        updateStudentRoute: this.domain + '/students',
    }

    constructor(private http: HttpClient) { }

    private _cachedStudents: Students = [];

    // Read
    getStudents(): Observable<Students> {
        let obs = this.http.get<any>(this.endpoints.getStudentsRoute).pipe(
            map(x => x.data)
        );
        
        let subscription = new Subscription();
        if (this.dataChanged || !this._cachedStudents) {
            // Cache data
            subscription = obs.subscribe(data => {
                this._cachedStudents = data as Students;
                subscription.unsubscribe();
            });
        }

        this.dataChanged = false;
        return obs;
    }

    get cachedStudents(): Students {
        if (!this._cachedStudents) {
            this.getStudents()
            .subscribe(data => {
                this._cachedStudents = data as any;
            });
            this.dataChanged = false;
        }

        return this._cachedStudents;
    }

    // Delete Student
    deleteStudent(id: number) {
        return this.http.delete(this.endpoints.updateStudentRoute + `/${id}`);
    }

    // Update Student
    updateStudent(studentData: Student) {
        return this.http.put(this.endpoints.updateStudentRoute, studentData);
    }

    // Add Student
    addStudent(studentData: Student) {
        return this.http.post(this.endpoints.getStudentsRoute, studentData);
    }
}
