import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { RestHttpService } from './rest-http.service';

@Injectable()
export class ObservableService {
    private subscriptions: Array<Subscription> = [];

    public constructor(private http: RestHttpService,
                       private loadingBar: SlimLoadingBarService) {
    }

    public getSubscriptions() {
        return this.subscriptions;
    }

    public addSubscription(subscription) {
        this.subscriptions.push(subscription);
    }

    public unsubscribe() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }

        this.http.setCurrentRequests(0);
        this.loadingBar.complete();
    }
}
