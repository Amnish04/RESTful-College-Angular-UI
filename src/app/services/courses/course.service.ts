import { isDefNotNull } from 'src/app/utilities/utility-functions';
import { Course, Courses } from './../../models/course.model';
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
    dataChanged: boolean = false; // Only fetch new data when dataChanged is true

    domainName: string = environment.apiDomain;
    endpoints = {
        get: this.domainName + '/courses'
    };

    cachedCourses: Courses;
    
    get latestAvailable(): boolean {
        return !this.dataChanged && !!this.cachedCourses?.length;
    }

    constructor(
        private http: HttpClient
    ) { }

    getCourses() {
        if (!this.latestAvailable) {
            return this.http.get<any>(this.endpoints.get)
            .pipe(
                map(data => data.data), // Alternate of pluck
                tap((data: Courses) => this.cacheCourses(data))
            );
        } return of(this.cachedCourses);
    }

    getCourseById(id: number) {
        if (!this.latestAvailable) {
            return this.http.get<any>(this.endpoints.get + `/${id}`)
            .pipe(
                map(x => x.data[0])
            );
        } 
        return of(this.cachedCourses.find(course => course.courseId === id));
    }

    updateCourse(course: Course) {
        return this.http.put(this.endpoints.get, course);
    };

    addCourse(course: Course) {
        return this.http.post(this.endpoints.get, course);
    }

    deleteCourse(id: number) {
        return this.http.delete(this.endpoints.get + `/${id}`);
    }

    cacheCourses(data: Courses) {
        this.cachedCourses = data;
        this.dataChanged = false;
    }
}
