import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
    ],
    providers: []
})
export class HomeModule {
}
