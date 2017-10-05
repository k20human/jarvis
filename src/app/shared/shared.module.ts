import { NgModule, ModuleWithProviders } from '@angular/core';
import { FaderComponent } from './components/fader/fader.component';
import { GrowlComponent } from './components/growl/growl.component';
import { GrowlService } from './services/growl.service';
import { GrowlModule } from 'primeng/components/growl/growl';
import { WindowService } from './services/window.service';
import { PanelModule } from './components/panel/panel.module';
import { BorderedComponent } from './components/bordered/bordered.component';
import { AuthService } from './services/auth.service';
import { RestHttpService } from './services/rest-http.service';
import { ExceptionService } from './services/exception.service';
import { SimplePanelComponent } from './components/simple-panel/simple-panel.component';
import { EventHubService } from './services/event-hub.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormHeaderComponent } from './components/form/form-header/form-header.component';
import { UrlHelperService } from './services/url-helper.service';
import { KeysPipe } from './pipes/keys.pipe';
import { FilesizePipe } from './pipes/filesize.pipe';
import { MapValuesPipe } from './pipes/map-values.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ObservableService } from './services/observable.service';
import { BooleanPipe } from './pipes/boolean.pipe';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        GrowlModule,
        //PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule
    ],
    declarations: [
        FaderComponent,
        GrowlComponent,
        BorderedComponent,
        SimplePanelComponent,
        FormHeaderComponent,
        KeysPipe,
        FilesizePipe,
        MapValuesPipe,
        NotFoundComponent,
        BooleanPipe,
        AccessDeniedComponent
    ],
    exports: [
        FaderComponent,
        GrowlComponent,
        BorderedComponent,
        SimplePanelComponent,
        //PanelModule,
        //FormHeaderComponent,
        KeysPipe,
        FilesizePipe,
        MapValuesPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GrowlModule,
        BooleanPipe,
        FlexLayoutModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                GrowlService,
                WindowService,
                AuthService,
                ExceptionService,
                RestHttpService,
                EventHubService,
                UrlHelperService,
                ObservableService,
            ]
        };
    }
}

