import { FormGroup } from '@angular/forms';
import { ElementRef, Input, ViewChild } from '@angular/core';

export abstract class FormHelperComponent {
    @ViewChild('formElement') formElement: ElementRef;

    public editMode: boolean;
    public form: FormGroup;

    /**
     *
     * @param list
     * @param key
     */
    protected setDefaultList(list, key) {
        if (!this.editMode) {
            const defaultValue = list.filter(object => object.default === true).shift();
            this.form.get(key).setValue(defaultValue.id);
        }

        this.triggerMouseEvent('keydown', key);
    }

    /**
     * Get property id or return empty string if null
     * @param property
     */
    protected getIdOrEmpty(property: any): string {
        return property != null ? property.id : '';
    }

    /**
     * Get property value or return empty string if null
     * @param property
     */
    protected getValueOrEmpty(property: any): string {
        return property != null ? property : '';
    }

    /**
     * Get DOM element by ID
     * @param id
     */
    protected getDomElement(id) {
        let element = null;

        if (this.formElement.nativeElement) {
            element = this.formElement.nativeElement;
        } else {
            element = this.formElement;
        }

        return element.querySelector('#' + id);
    }

    /**
     * Trigger DOM mouse event on an element
     * @param eventName
     * @param property
     */
    protected triggerMouseEvent(eventName, property) {
        const domElement = this.getDomElement('input-' + property);

        if (this.form.get(property) != null) {
            const event = new MouseEvent(eventName, {bubbles: true});
            domElement.dispatchEvent(event);
        }
    }
}
