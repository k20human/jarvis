import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidator {
    static matchField(fieldFirst: string, fieldSecond: string) {
        return (ac: AbstractControl) => {
            const first = ac.get(fieldFirst).value;
            const second = ac.get(fieldSecond).value;

            if (first !== second) {
                ac.get(fieldSecond).setErrors({matchField: true})
            } else {
                return null
            }
        }
    }
}
