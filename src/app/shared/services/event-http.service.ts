import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class EventHttpService extends Http {
    private currentRequests = 0;

    public constructor(private backend: ConnectionBackend, private defaultOptions: RequestOptions, private loadingBar: SlimLoadingBarService) {
        super(backend, defaultOptions);
    }

    public setCurrentRequests(currentRequests: number) {
        this.currentRequests = currentRequests;
    }

    /**
     * GET
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.get(url, options));
    }

    /**
     * PATCH
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.patch(url, body, options));
    }

    /**
     * PUT
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.put(url, body, options));
    }

    /**
     * POST
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.post(url, body, options));
    }

    /**
     * HEAD
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.head(url, options));
    }

    /**
     * DELETE
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.incrementRequestCount();
        return this.executeRequest(super.delete(url, options));
    }

    /**
     * Decrement request counter
     */
    private decrementRequestCount() {
        if (--this.currentRequests === 0) {
            this.loadingBar.complete();
        }
    }

    /**
     * Increment request counter
     */
    private incrementRequestCount() {
        if (this.currentRequests++ === 0) {
            this.loadingBar.start();
        }
    }

    /**
     * Execure request and decrement counter
     * @param response
     * @returns {Observable<Response>}
     */
    private executeRequest(response: Observable<Response>): Observable<Response> {
        return response
            .map(res => {
                this.decrementRequestCount();
                return res;
            })
            .catch((err) => {
                this.decrementRequestCount();
                return Observable.throw(err);
            });
    }
}
