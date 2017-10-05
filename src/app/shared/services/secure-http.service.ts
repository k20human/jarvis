import { Injectable } from '@angular/core';
import { ConnectionBackend, Headers, RequestOptions, Response, RequestOptionsArgs, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EventHttpService } from './event-http.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { isNullOrUndefined } from "util";

@Injectable()
export class SecureHttpService extends EventHttpService {
    public constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, loadingBar: SlimLoadingBarService) {
        super(backend, defaultOptions, loadingBar);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.appendAuthenticationToken(options));
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.appendAuthenticationToken(options);
        return super.post(url, body, options);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.appendAuthenticationToken(options);
        return super.put(url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.appendAuthenticationToken(options);
        return super.delete(url, options);
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.appendAuthenticationToken(options);
        return super.patch(url, body, options);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.appendAuthenticationToken(options);
        return super.head(url, options);
    }

    private appendAuthenticationToken(options?: RequestOptionsArgs) {
        if (isNullOrUndefined(options)) {
            options = new RequestOptions();
        }
        if (isNullOrUndefined(options.headers)) {
            options.headers = new Headers();
        }
        options.headers.append('Accept', 'application/json');
        if (localStorage.getItem('oauth')) {
            options.withCredentials = true;
            options.headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        return options;
    }

    private getToken() {
        const credentials = JSON.parse(localStorage.getItem('oauth'));
        return credentials.token;
    }

}
