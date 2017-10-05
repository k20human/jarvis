import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './core/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './core/simple-layout/simple-layout.component';
import { navbarMenu } from './core/full-layout/navbar/navbar.menu';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { AnonymousGuard } from './shared/guards/anonymous.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/home/home.module#HomeModule'
            },
            ...navbarMenu
        ]
    },
    {
        path: 'login',
        component: SimpleLayoutComponent,
        canActivate: [AnonymousGuard],
        children: [
            {
                path: '',
                loadChildren: 'app/login/login.module#LoginModule'
            }
        ]
    },
    {
        path: '404',
        component: SimpleLayoutComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent,
                data: {
                    title: '404'
                },
            }
        ]
    },
    {
        path: '403',
        component: SimpleLayoutComponent,
        children: [
            {
                path: '',
                component: AccessDeniedComponent,
                data: {
                    title: 'Access denied'
                },
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,
            {
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
