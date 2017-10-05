import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { GrowlService, GrowlMessage } from "../../services/growl.service";
import { Message } from "primeng/primeng";

@Component({
    selector: 'app-growl',
    templateUrl: './growl.component.html',
    styleUrls: ['./growl.component.scss']
})
export class GrowlComponent implements OnInit {

    public messages: Message[] = [];
    private growlSubscription: Subscription;

    constructor(private growlService: GrowlService) {
        this.growlSubscription = this.growlService.growlState.subscribe((growlMessage) => {
            this.activate(growlMessage);
        });
    }

    ngOnInit() {
    }

    activate(growlMessage: GrowlMessage) {
        this.messages = [];
        this.messages.push({
            severity: growlMessage.severity,
            summary: growlMessage.title,
            detail: growlMessage.message
        });
    }

}
