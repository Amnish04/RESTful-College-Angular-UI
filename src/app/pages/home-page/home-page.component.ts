import { MatSnackBar } from '@angular/material/snack-bar';
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
    credits = 'Sound effects obtained from https://www.zapsplat.com';

    constructor(
        private snackBar: MatSnackBar
    ) { }

    @ViewChild('welcomePage') welcomePage: ElementRef<HTMLDivElement>;
    @ViewChild('leftButton', { read: ElementRef }) leftButton: ElementRef<HTMLAnchorElement>;
    @ViewChild('rightButton', { read: ElementRef }) rightButton: ElementRef<HTMLAnchorElement>;

    ngOnInit(): void {
        
    }
    
    onLeftButtonHover() {
        this.backgroundGradient = 'linear-gradient(to right, pink, white)';
    }

    onRightButtonHover() {
        this.backgroundGradient = 'linear-gradient(to right, white, pink)';
    }

    openCreditsDetails(message: string) {
        this.snackBar.open(message, 'Understood', {
            duration: 1000 * 5,
            panelClass: ['mat-toolbar', 'mat-primary'],
        });
    }
}
