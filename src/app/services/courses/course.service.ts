import { Courses } from './../../models/course.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    /**
     * `dataChanged` needs to be operated very carefully as this decides if you recieve cached or new data from server,
     *  optimizes number of network requests
     */
    dataChanged: boolean = true; // Only fetch new data when dataChanged is true

    domainName: string = environment.apiDomain;
    endpoints = {
        get: this.domainName + '/courses'
    };

    cachedCourses: Courses;

    constructor(
        private http: HttpClient
    ) { }

    getCourses() {
        if (this.dataChanged) {
            return this.http.get<any>(this.endpoints.get)
            .pipe(
                map(data => data.data), // Alternate of pluck
                tap((data: Courses) => this.cacheCourses(data))
            );
        } return of(this.cachedCourses);
    }

    cacheCourses(data: Courses) {
        this.cachedCourses = data;
        this.dataChanged = false;
    }
}
