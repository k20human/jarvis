import { Component, ElementRef } from "@angular/core";
import { BlockableUI } from "primeng/primeng";

@Component({
    selector: 'app-simple-panel',
    templateUrl: './simple-panel.component.html'
})
export class SimplePanelComponent implements BlockableUI {
    constructor(private el: ElementRef) {}

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
}
