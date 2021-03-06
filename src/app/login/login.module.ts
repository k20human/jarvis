import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, TabViewModule, TabMenuModule, GrowlModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { AuthService } from '../shared/services/auth.service';
import { ExceptionService } from '../shared/services/exception.service';
import { MdButtonModule, MdCardModule, MdFormFieldModule, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        TabViewModule,
        TabMenuModule,
        InfiniteScrollModule,
        LoginRoutingModule,
        GrowlModule,
        ConfirmDialogModule,
        MdCardModule,
        FlexLayoutModule,
        MdFormFieldModule,
        MdInputModule,
        MdButtonModule
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [
        ExceptionService,
        AuthService,
        ConfirmationService
    ]
})

export class LoginModule {
}
