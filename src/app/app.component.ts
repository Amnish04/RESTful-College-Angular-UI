import { LoadingService } from './services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    get isHome() {
        return this.router.url === '/' || this.router.url === '/home';
    }

    constructor(
        private router: Router,
        public loadingService: LoadingService
    ) {
    }

    ngOnInit(): void {
    }
}
