import { Component, OnChanges, Input, Directive, AfterContentInit, ContentChild } from '@angular/core';
import { Colors } from "../../enums/colors.enum";

@Directive({selector: 'app-panel-solid-title'})
export class PanelSolidTitleDirective {
}

@Directive({selector: 'app-panel-solid-value'})
export class PanelSolidValueDirective {
}

@Component({
    selector: 'app-panel-solid',
    templateUrl: './panel-solid.component.html',
    styleUrls: ['./panel-solid.component.scss']
})
export class PanelSolidComponent implements OnChanges, AfterContentInit {
    @Input() color: Colors = null;
    @Input() icon: string = null;
    @Input() link = false;

    @ContentChild(PanelSolidTitleDirective) title: PanelSolidTitleDirective;
    @ContentChild(PanelSolidValueDirective) value: PanelSolidValueDirective;

    constructor() {
    }

    ngAfterContentInit() {
    }

    ngOnChanges() {
    }
}
