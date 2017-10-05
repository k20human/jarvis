import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class EventHubService {
    private event = new Subject<any>();

    event$ = this.event.asObservable();

    // Service message commands
    triggerEvent(event: any) {
        this.event.next(event);
    }
}
