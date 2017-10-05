import {
    Component,
    OnChanges,
    ContentChild,
    Directive,
    Input,
    AfterContentInit, Renderer2, Output, EventEmitter, Inject
} from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { BootstrapColorsType } from "../../types/bootstrap-colors.type";
import { DOCUMENT } from "@angular/platform-browser";

@Directive({selector: 'app-panel-title'})
export class PanelTitleDirective {
}

@Directive({selector: 'app-panel-body'})
export class PanelBodyDirective {
}

@Directive({selector: 'app-panel-footer'})
export class PanelFooterDirective {
}

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [
        trigger('visibilityChanged', [
            state('true', style({opacity: 1})),
            state('false', style({opacity: 0})),
            transition('1 => 0', animate('300ms')),
            transition('0 => 1', animate('900ms'))
        ])
    ],
})
export class PanelComponent implements OnChanges, AfterContentInit {
    @Input() color: BootstrapColorsType;
    @Input() displayClose = true;
    @Input() displayFullscreen = true;
    @Input() isCollapsed = false;

    @Output() public onShowFullScreen: EventEmitter<PanelComponent> = new EventEmitter<PanelComponent>();
    @Output() public onHideFullScreen: EventEmitter<PanelComponent> = new EventEmitter<PanelComponent>();
    @Output() public onClose: EventEmitter<PanelComponent> = new EventEmitter<PanelComponent>();
    @Output() public onExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public onCollapsed: EventEmitter<boolean> = new EventEmitter<boolean>();

    readonly classFullscreen: string = 'body--fullscreen';

    public isFullscreen = false;
    public isVisible = true;
    public showFooter = false;

    @ContentChild(PanelTitleDirective) title: PanelTitleDirective;
    @ContentChild(PanelBodyDirective) body: PanelBodyDirective;
    @ContentChild(PanelFooterDirective) footer: PanelFooterDirective;

    constructor(private renderer: Renderer2,
                @Inject(DOCUMENT) private document: any) {
        this.color = 'default';
    }

    public collapseManagement(event: any): void {
        if (!this.displayClose && !this.displayFullscreen) {
            this.isCollapsed = !this.isCollapsed;
        }
    }

    public collapsed(event: any): void {
        this.onCollapsed.emit(false);
    }

    public expanded(event: any): void {
        this.onExpanded.emit(true);
    }

    public close(): void {
        this.onClose.emit(this);

        this.isVisible = false;
    }

    public toggleFullscreen(): void {
        return this.isFullscreen ? this.hideFullscreen() : this.openFullscreen();
    }

    private openFullscreen(): void {
        this.onShowFullScreen.emit(this);
        this.manageFullscreen(true);
    }

    private hideFullscreen(): void {
        this.onHideFullScreen.emit(this);
        this.manageFullscreen(false);
    }

    private manageFullscreen(value: boolean): void {
        this.isFullscreen = value;

        if (this.document && this.document.body) {
            if (value) {
                this.renderer.addClass(this.document.body, this.classFullscreen);
            } else {
                this.renderer.removeClass(this.document.body, this.classFullscreen);
            }
        }
    }

    ngAfterContentInit() {
        this.showFooter = this.footer != null;
    }

    ngOnChanges() {
    }
}
