import { LoadingService } from './services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    noHeaderUrls = ['/', '/home', '/authenticate']; // Urls where header should not be shown
    get isHome() {
        return this.noHeaderUrls.includes(this.router.url);
    }

    constructor(
        private router: Router,
        public loadingService: LoadingService
    ) {
    }

    ngOnInit(): void {
    }
}
