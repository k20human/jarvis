import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { RestHttpService } from './rest-http.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UrlHelperService {
    protected baseUrl: string;

    constructor(private http: RestHttpService) {
        this.baseUrl = environment.api.baseUrl;
    }

    public get(url: string): Observable<any> {
        return new Observable((observer: Subscriber<any>) => {
            let objectUrl: string = null;

            url = url.replace(this.baseUrl, '');

            this.http
                .get(url, {
                    responseType: ResponseContentType.Blob
                })
                .subscribe(m => {
                    objectUrl = URL.createObjectURL(m.blob());
                    observer.next(objectUrl);
                });

            return () => {
                if (objectUrl) {
                    URL.revokeObjectURL(objectUrl);
                    objectUrl = null;
                }
            };
        });
    }
}
