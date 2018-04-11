import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginCredentials } from '../model/login-credentials';
import { LoggingServiceInterface, loggingToken } from '../model/logging-service-interface';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    errorMessage: any;
    debugger;
    public loginCredentials: LoginCredentials = new LoginCredentials();
    constructor(public router: Router, private _authenticationService: AuthenticationService) { }
    public onLogin() {
        this.loginCredentials.transactiontype = 'login';
        this.loginCredentials.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._authenticationService.logIn(this.loginCredentials)
            .subscribe((res) => {
                debugger;
                if (res!==undefined) {
                    if (res.email) {
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigateByUrl('dashboard');
                    }
                }
            });
    }
    public ngOnInit() {

    }
}
