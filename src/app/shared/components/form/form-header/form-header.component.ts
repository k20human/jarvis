import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-form-header',
    templateUrl: './form-header.component.html',
    styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
    @Input() displayWarning: boolean;
    @Input() disabledValidate: boolean;
    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    cancel(): void {
        this.onCancel.emit();
    }
}
