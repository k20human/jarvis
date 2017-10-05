import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import 'rxjs/add/operator/catch';
import { RestHttpService } from './rest-http.service';
import { ExceptionService } from './exception.service';
import { Router } from '@angular/router';
import { GrowlService } from './growl.service';

@Injectable()
export class AuthService {
    private baseUrl: string;
    private isAuth = false;

    constructor(private http: Http,
                private restHttp: RestHttpService,
                private exceptionService: ExceptionService,
                private router: Router,
                private growlService: GrowlService) {
        this.baseUrl = environment.api.baseUrl;
    }

    /**
     * Check if user is loggin
     * @returns {any}
     */
    public isLoggedIn(): Observable<boolean> {
        if (this.isAuth) {
            return Observable.of(true);
        } else {
            return this.restHttp.get('/users/connected').map(res => {
                return res.json();
            }).map((account) => {
                if (account) {
                    localStorage.setItem('profile', JSON.stringify(account));
                    this.isAuth = true;
                }
                return true;
            }).catch(err => Observable.of(false));
        }
    }

    /**
     * Get connected user
     * @returns {any}
     */
    public getConnectedUser(): User {
        this.isLoggedIn().subscribe();
        return this.getConnectedUserFromLocalStorage();
    }

    public getConnectedUserFromLocalStorage() {
        const json = JSON.parse(localStorage.getItem('profile'));

        if (!json) {
            return null;
        }

        return User.fromJSON(json);
    }

    /**
     * Login user
     * @param username
     * @param password
     * @returns {Observable<R>}
     */
    public login(username: string, password: string): Observable<boolean> {
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/login_check', JSON.stringify({
            _username: username,
            _password: password
        }), options)
            .map(res => res.json())
            .catch(err => this.exceptionService.catchBadResponse(err));
    }

    /**
     * Logout user
     */
    public logout() {
        this.isAuth = false;
        localStorage.removeItem('profile');
        localStorage.removeItem('oauth');

        this.router.navigate(['login']);
        this.growlService.activate('Déconnecté avec succès', '', 'success');
    }
}
