import { Component, OnChanges, Input } from '@angular/core';
import { Colors } from "../../enums/colors.enum";

@Component({
    selector: 'app-bordered',
    templateUrl: './bordered.component.html',
    styleUrls: ['./bordered.component.scss']
})
export class BorderedComponent implements OnChanges {
    @Input() color: Colors;

    constructor() {
        this.color = null;
    }

    ngOnChanges() {
    }
}
