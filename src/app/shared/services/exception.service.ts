import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GrowlService } from './growl.service';
import { isDevMode } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class ExceptionService {
    private message: string;

    constructor(
        private growlService: GrowlService,
        public router: Router) {
    }

    /**
     * Catch bad respond and reformat
     * @param errorResponse
     * @returns {any}
     */
    public catchBadResponse(errorResponse: any): Observable<any> {
        const res = <Response>errorResponse;
        let body;

        if (typeof res === 'string' || res instanceof DOMException) {
            return Observable.of(false);
        } else if (res.type === 2) {
            body = res.json() || '';
        } else { // Special Blop case
            const errorMessage = res.statusText;

            this.growlService.activate(errorMessage, 'Erreur', 'error');
            return Observable.throw(errorMessage);
        }

        const errorMessage = body.message || JSON.stringify(body);

        this.message = errorMessage;

        // Get message from error code
        switch (res.status) {
            case 500:
                this.error500(body.error);
                break;
            case 401:
                this.router.navigate(['/login']);
                this.error401(body);
                break;
            case 404:
                this.router.navigate(['/404']);
                this.exception(body.error);
                break;
            case 400:
                this.message = '';
                this.error400(body);
                break;
            default:
                this.exception(body.error);
        }

        this.growlService.activate(this.message, 'Erreur', 'error');

        return Observable.throw(errorMessage);
    }

    /**
     * Error 401
     * @param error
     */
    private error401(error: any): void {
        this.message = error.error_description;
    }

    /**
     * Error 500 - Internal Server Error
     * @param error
     */
    private error500(error: any): void {
        this.message = error.message;
    }

    /**
     * Error 400 - Bad request
     * @param errors
     */
    private error400(errors: any): void {
        if (errors.hasOwnProperty('errors')) {
            this.message += errors.errors + '<br />';
        }

        if (errors.hasOwnProperty('children')) {
            const children = errors.children;

            for (const key in children) {
                if (children.hasOwnProperty(key)) {
                    const value = children[key];

                    // Sub array
                    if (value.hasOwnProperty('children')) {
                        this.error400(value);
                    } else if (value.hasOwnProperty('errors')) {
                        this.message += key + ' : ' + value.errors.join(', ') + '<br />';
                    }
                }
            }
        } else if (errors.hasOwnProperty('error_description')) {
            this.message += errors.error_description;
        }
    }

    /**
     * Generic exception error message
     * @param error
     */
    private exception(error: any): void {
        this.message = error.message;

        if (isDevMode()) {
            this.message += '<br />' + error.exception[0].message;
        }
    }
}
