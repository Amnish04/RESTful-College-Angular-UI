import { Students } from './../../models/student.model';
import { Injectable } from '@angular/core';
    import { Observable, of, pluck } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    dataChanged = true;

    constructor(private http: HttpClient) { }

    private _cachedStudents: Students;

    getStudents(): Observable<Students> {
        let obs = this.http.get<Students>('https://api-restful-college.cyclic.app/students');
        
        if (this.dataChanged || !this._cachedStudents) {
            // Cache data
            obs.pipe(pluck('data')).subscribe(data => {
                this._cachedStudents = data as Students;
            });
        }

        this.dataChanged = false;
        return obs;
    }

    get cachedStudents(): Students {
        return this._cachedStudents;
    }

}
