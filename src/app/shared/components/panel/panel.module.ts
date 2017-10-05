import { NgModule } from '@angular/core';
import { PanelComponent, PanelBodyDirective, PanelTitleDirective, PanelFooterDirective } from './panel.component';
import { CommonModule } from '@angular/common';
import { PanelSolidComponent, PanelSolidTitleDirective, PanelSolidValueDirective } from './panel-solid.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PanelComponent,
        PanelBodyDirective,
        PanelTitleDirective,
        PanelFooterDirective,
        PanelSolidComponent,
        PanelSolidTitleDirective,
        PanelSolidValueDirective
    ],
    exports: [
        PanelComponent,
        PanelBodyDirective,
        PanelTitleDirective,
        PanelFooterDirective,
        PanelSolidComponent,
        PanelSolidTitleDirective,
        PanelSolidValueDirective
    ]
})
export class PanelModule {

}
