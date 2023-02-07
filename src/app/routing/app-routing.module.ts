import { CourseAddEditComponent } from './../components/courses/course-add-edit/course-add-edit.component';
import { StudentAddEditComponent } from './../components/students/student-add-edit/student-add-edit.component';
import { CoursesPageComponent } from './../pages/courses-page/courses-page.component';
import { StudentPageComponent } from './../pages/student-page/student-page.component';
import { ErrorPageComponent } from './../pages/error-page/error-page.component';
import { HomePageComponent } from './../pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'students', component: StudentPageComponent, title: "Data Management - Students Page" },
    { path: 'students/:id', component: StudentAddEditComponent },
    { path: 'students/add-new', component: StudentAddEditComponent },
    { path: 'courses', component: CoursesPageComponent, title: "Data Management - Courses Page" },
    { path: 'courses/:id', component: CourseAddEditComponent },
    { path: 'courses/add-new', component: CourseAddEditComponent },
    { path: '', component: HomePageComponent, title: "Data Management" },
    { path: '**', component: ErrorPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
