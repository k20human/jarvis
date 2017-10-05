import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface GrowlMessage {
    title: string;
    message: string;
    severity?: string;
}

@Injectable()
export class GrowlService {
    private growlSubject = new Subject<GrowlMessage>();

    growlState = this.growlSubject.asObservable();

    constructor() {

    }

    activate(message: string, title?: string, severity?: string) {
        this.growlSubject.next(<GrowlMessage>{ title: title, message: message, severity: severity });
    }
}