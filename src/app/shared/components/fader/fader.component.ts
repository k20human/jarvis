import { Component, OnChanges, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
    selector: 'app-fader',
    templateUrl: './fader.component.html',
    styleUrls: ['./fader.component.scss'],
    animations: [
        trigger('visibilityChanged', [
            state('true' , style({ opacity: 1 })),
            state('false', style({ opacity: 0  })),
            transition('1 => 0', animate('300ms')),
            transition('0 => 1', animate('900ms'))
        ])
    ],
})
export class FaderComponent implements OnChanges {
    @Input() isVisible: boolean = true;

    ngOnChanges() {}
}
