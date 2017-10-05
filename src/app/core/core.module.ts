import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NavbarComponent } from './full-layout/navbar/navbar.component';
import { LayoutService } from './shared/services/layout.service';
import { RouterModule } from '@angular/router';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HeaderComponent } from './full-layout/header/header.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        Ng2PageScrollModule.forRoot(),
    ],
    providers: [
        LayoutService,
    ],
    exports: [
        NavbarComponent,
        FullLayoutComponent,
        SimpleLayoutComponent
    ]
})

export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
