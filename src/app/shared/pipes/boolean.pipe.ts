import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Pipe({
    name: 'boolean',
    pure: false
})
export class BooleanPipe implements PipeTransform {
    private value = '';

    constructor() {
    }

    transform(value: boolean): string {
        if (value === true) {
            return 'Oui';
        } else {
            return 'Non';
        }
    }

}
