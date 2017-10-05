import { Injectable } from '@angular/core';
import { SecureHttpService } from "./secure-http.service";
import { ExceptionService } from "./exception.service";
import { environment } from "../../../environments/environment";
import { ConnectionBackend, Headers, RequestOptions, Response, RequestOptionsArgs, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class RestHttpService extends SecureHttpService {
    protected baseUrl: string;

    public constructor(backend: ConnectionBackend,
                       defaultOptions: RequestOptions,
                       loadingBar: SlimLoadingBarService,
                       private exceptionService: ExceptionService) {
        super(backend, defaultOptions, loadingBar);

        this.baseUrl = environment.api.baseUrl;
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.baseUrl + url, options).catch(err => this.exceptionService.catchBadResponse(err));
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return super.post(this.baseUrl + url, body, options).catch(err => this.exceptionService.catchBadResponse(err));
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.baseUrl + url, body, options).catch(err => this.exceptionService.catchBadResponse(err));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.baseUrl + url, options).catch(err => this.exceptionService.catchBadResponse(err));
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.patch(this.baseUrl + url, body, options).catch(err => this.exceptionService.catchBadResponse(err));
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.head(this.baseUrl + url, options);
    }
}
