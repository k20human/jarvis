import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { WindowService } from '../../shared/services/window.service';

@Component({
    selector: 'app-layout-main',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
    private mini = false;
    private subscription: Subscription;
    private window: any;

    constructor(private windowService: WindowService) {
        this.window = windowService.nativeWindow;
    }

    ngOnInit() {

    }

    public isMiniDesktop(): boolean {
        return this.mini && this.window.innerWidth > 767;
    }

    public isMiniMobile(): boolean {
        return this.mini && this.window.innerWidth <= 767;
    }
}
