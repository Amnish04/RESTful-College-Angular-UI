import { StudentService } from './../../services/students/student-service.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    pageTitle = "Welcome to RESTful Data Management";
    leftButtonHovered: boolean = true;
    backgroundGradient: string = 'linear-gradient(to right, pink, white)';

    constructor(
        private studentService: StudentService
    ) { }

    @ViewChild('welcomePage') welcomePage: ElementRef<HTMLDivElement>;
    @ViewChild('leftButton', { read: ElementRef }) leftButton: ElementRef<HTMLAnchorElement>;
    @ViewChild('rightButton', { read: ElementRef }) rightButton: ElementRef<HTMLAnchorElement>;

    ngOnInit(): void {
        this.studentService.getStudents();
    }
    
    onLeftButtonHover() {
        this.backgroundGradient = 'linear-gradient(to right, pink, white)';
    }

    onRightButtonHover() {
        this.backgroundGradient = 'linear-gradient(to right, white, pink)';
    }
}
