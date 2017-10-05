import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {username: '', password : ''};
    loading = false;
    returnUrl = '/';

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loading = false;
    }

    login() {
        this.loading = true;

        this.authService.login(this.model.username, this.model.password)
            .catch(res => {
                this.loading = false;
                return Observable.throw(res.json());
            })
            .subscribe(
                res => {
                    localStorage.setItem('oauth', JSON.stringify(res));
                    this.router.navigate([this.returnUrl]);
                });
    }

}
