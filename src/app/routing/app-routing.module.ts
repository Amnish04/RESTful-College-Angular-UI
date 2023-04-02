import { AuthPageComponent } from './../pages/auth-page/auth-page.component';
import { CourseAddEditComponent } from './../components/courses/course-add-edit/course-add-edit.component';
import { StudentAddEditComponent } from './../components/students/student-add-edit/student-add-edit.component';
import { CoursesPageComponent } from './../pages/courses-page/courses-page.component';
import { StudentPageComponent } from './../pages/student-page/student-page.component';
import { ErrorPageComponent } from './../pages/error-page/error-page.component';
import { HomePageComponent } from './../pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from '../services/authentication/auth.guard';

const routes: Routes = [
    { 
        path: 'students', 
        title: "Data Management - Students Page",
        children: [
            { 
                path: '', 
                component: StudentPageComponent
            },
            { 
                path: ':id', 
                component: StudentAddEditComponent
            },
            { 
                path: 'add-new',
                component: StudentAddEditComponent 
            }
        ],
        canActivate: [canActivateGuard]
    },
    { 
        path: 'courses', 
        title: "Data Management - Courses Page" ,
        children: [
            { 
                path: '', 
                component: CoursesPageComponent 
            },
            { 
                path: ':id', 
                component: CourseAddEditComponent 
            },
            { 
                path: 'add-new', 
                component: CourseAddEditComponent 
            },
        ],
        canActivate: [canActivateGuard]
    },
    { 
        path: 'home', 
        component: HomePageComponent, 
        title: "Data Management",
        canActivate: [canActivateGuard]
    },
    {   // Handles sign in and sign up 
        path: 'authenticate', 
        component: AuthPageComponent, 
        title: "Login / Signup",
    },
    {
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full',
    },
    { 
        path: '**', 
        component: ErrorPageComponent
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
