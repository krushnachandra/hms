import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginCredentials } from '../model/login-credentials';
import { LoggingServiceInterface, loggingToken } from '../model/logging-service-interface';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    errorMessage: any;
    public loginCredentials: LoginCredentials = new LoginCredentials();
    constructor(public router: Router, private _authenticationService: AuthenticationService,
        private toastr: ToastrService) { }
    public onLogin() {
        this.loginCredentials.transactiontype = 'login';
        this.loginCredentials.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._authenticationService.logIn(this.loginCredentials)
            .subscribe((res) => {
                if (res !== undefined) {
                    if (res.Result === 'SUCCESS') {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('user', res.data.name);
                        localStorage.setItem('sessid', res.data.sessid);
                        this.router.navigateByUrl('dashboard');
                    }
                    if (res.Result === 'FAILED') {
                        //this.errorMessage = res.Result;
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
    }
    public ngOnInit() {

    }
}
