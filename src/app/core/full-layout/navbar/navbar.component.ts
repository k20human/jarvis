import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../shared/services/layout.service';
import { navbarMenu } from './navbar.menu';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';

@Component({
    selector: 'app-layout-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private menuRoutes: any = navbarMenu;
    public isMenuCollapsed = true;
    public menuItems: any[];
    public user: User;

    constructor(private layoutService: LayoutService,
                public authService: AuthService) {
    }

    public ngOnInit(): void {
        this.user = this.authService.getConnectedUser();
        this.menuItems = this.layoutService.convertRoutesToMenus(this.menuRoutes);
    }
}
