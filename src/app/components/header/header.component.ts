import { LoadingService } from './../../services/loading/loading.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/authentication/auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    get currentPath(): string {
        return this.location.path();
    }

    constructor(
        private location: Location,
        private authService: AuthService,
        private router: Router,
        private loadingService: LoadingService
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.loadingService.loading = true;

        setTimeout(() => {
            this.authService.logout();
            this.loadingService.loading = false;
            this.router.navigate(['authenticate']);
        }, 1000);
    }

}
