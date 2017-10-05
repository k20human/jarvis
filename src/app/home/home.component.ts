import { Component, OnInit, HostBinding } from '@angular/core';
import { BaseComponent } from "../shared/components/base/base";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
    ngOnInit() {

    }
}
