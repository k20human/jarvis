import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { RestHttpService } from './shared/services/rest-http.service';
import { ExceptionService } from './shared/services/exception.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceLocator } from './shared/misc/service-locator';
import { HttpClientModule } from '@angular/common/http';
import { AnonymousGuard } from './shared/guards/anonymous.guard';

export function RestHttpFactory(backend: XHRBackend,
                                options: RequestOptions,
                                loadingBar: SlimLoadingBarService,
                                exceptionService: ExceptionService) {
    return new RestHttpService(backend, options, loadingBar, exceptionService);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SlimLoadingBarModule.forRoot(),
        SharedModule.forRoot(),
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpModule,
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        AnonymousGuard,
        {
            provide: RestHttpService,
            useFactory: RestHttpFactory,
            deps: [XHRBackend, RequestOptions, SlimLoadingBarService, ExceptionService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}
