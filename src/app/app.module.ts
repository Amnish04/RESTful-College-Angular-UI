import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentService } from './services/students/student-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './routing/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { StudentsTableComponent } from './components/students/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { ClickOnKeyDirective } from './directives/click-on-key.directive';
import { StudentAddEditComponent } from './components/students/student-add-edit/student-add-edit.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoursesTableComponent } from './components/courses/courses-table/courses-table.component';
import { CourseAddEditComponent } from './components/courses/course-add-edit/course-add-edit.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SoundOnClickDirective } from './directives/sound-on-click.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { MatRippleModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExtractFirstWordPipe } from './pipes/extract-first-word.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ErrorPageComponent,
    StudentPageComponent,
    CoursesPageComponent,
    StudentsTableComponent,
    ClickOnKeyDirective,
    StudentAddEditComponent,
    PageHeaderComponent,
    YesNoModalComponent,
    CoursesTableComponent,
    CourseAddEditComponent,
    SoundOnClickDirective,
    SettingsComponent,
    ExtractFirstWordPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
