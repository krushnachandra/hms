import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    user_type: number;
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    _sideMenu: SideMenu[];

    constructor(private translate: TranslateService, public router: Router) {
       this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
       this.user_type = +localStorage.getItem('user_type');
       debugger;
        if (this.user_type === 1) {
            debugger;
        this._sideMenu = [{url: '/dashboard', menuText: 'Dashboard'},{url: '/doctorList', menuText: 'Doctor List'}, {url: '/doctor-register', menuText: 'Doctor Register'},{url: '/patient-register', menuText: 'Patient Register'}];
        } else {
            this._sideMenu = [{url: '/dashboard', menuText: 'Dashboard'}, {url: '/patient-register', menuText: 'Patient Register'}];
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
class SideMenu {
    url: string;
    menuText: string;
}
