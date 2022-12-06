import { Students } from './../../models/student.model';
import { Injectable } from '@angular/core';
    import { map, Observable, of, pluck } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    dataChanged = true;
    getStudentsRoute: string = 'https://api-restful-college.cyclic.app/students';

    constructor(private http: HttpClient) { }

    private _cachedStudents: Students;

    getStudents(): Observable<Students> {
        let obs = this.http.get<any>(this.getStudentsRoute).pipe(
            map(x => x.data)
        );

        if (this.dataChanged || !this._cachedStudents) {
            // Cache data
            obs.subscribe(data => {
                this._cachedStudents = data as Students;
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

}
