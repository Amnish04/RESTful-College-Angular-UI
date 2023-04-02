import { LoadingService } from './../../services/loading/loading.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
    loginFailed: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingService: LoadingService
    ) { }

    ngOnInit(): void {
    }

    login() {
        this.loadingService.loading = true;
        this.authService.login()
        .subscribe(res => {
            this.loadingService.loading = false;
            if (res) {
                console.log("Here")
                this.router.navigate(['home']);
            }
            else {
                this.loginFailed = true;
            }
        });
    }

}
