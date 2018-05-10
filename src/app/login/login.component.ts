import { Router, ActivatedRoute } from '@angular/router';
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
    hwid:any = '';
    web_token:any = '';
    public loginCredentials: LoginCredentials = new LoginCredentials();
    constructor(public router: Router, private _authenticationService: AuthenticationService,
        private toastr: ToastrService,private _activatedRoute: ActivatedRoute) { 
            // this._activatedRoute.queryParams
            //         .subscribe(params => {
            //         this.hwid = params['hwid'];
            //         this.web_token = params['wt'];
            //         });

                    this.hwid = localStorage.getItem('hwid');
                    this.web_token = localStorage.getItem('wt');
        }
    public onLogin() {
        debugger;
        this.loginCredentials.transactiontype = 'login';
        this.loginCredentials.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this.loginCredentials.web_token = this.web_token;
        this.loginCredentials.hwid = this.hwid;
        this._authenticationService.logIn(this.loginCredentials)
            .subscribe((res) => {
                if (res !== undefined) {
                    if (res.Result === 'SUCCESS') {
                        
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('user', res.data.name);
                        localStorage.setItem('sessid', res.data.sessid);
                        localStorage.setItem('created_by', res.data.docid);
                        localStorage.setItem('user_type', res.data.user_type);
                        localStorage.setItem('hospitalname', res.data.hospitalname);
                        localStorage.setItem('hospital_id', res.data.hospital_id);
                        localStorage.setItem('specialist', res.data.specialist);
                        localStorage.setItem('specialist_id', res.data.specialist_id);
                        localStorage.setItem('phone', res.data.phone);
                        localStorage.setItem('email', res.data.email);
                        localStorage.setItem('civilid', res.data.civilid);
                        this.router.navigateByUrl('dashboard');
                    }
                    if (res.Result === 'FAILED') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
    }
    public ngOnInit() {
    }
}
