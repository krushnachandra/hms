import { SpecialistModel } from '../../model/specialist-model';
import { HospitalModel } from '../../model/hospital-model';
import { HospitalService } from '../../service/hospital-service';
import { SpecialistService } from '../../service/specialist-service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { User } from '../../model/user-model';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    animations: [routerTransition()]
})
export class ChangePasswordComponent implements OnInit {
    public output: any;
    public updatePasswordData: User = new User();
    constructor(public router: Router,
        private _authenticationService: AuthenticationService,
        private toastr: ToastrService) { }

    public ngOnInit() {
        // call the method on initial load of page to bind drop down

    }
    public onSubmit() {
        this.updatePasswordData.transactiontype = 'insert';
        this.updatePasswordData.sessid = localStorage.getItem('sessid');

            this._authenticationService.DoctorRegister(this.updatePasswordData)
            .subscribe((res) => {
                if (res !== undefined) {
                    if (res.Result === 'success') {
                        this.toastr.success(res.Result, res.Result);
                        this.reset();
                        this.router.navigateByUrl('login');
                    }
                    if (res.Result === 'failed') {
                        this.toastr.error(res.Result, res.Result);
                    }
                    if (res.Result === 'Email already exists.Please check') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
    }
    public reset() {
        this._user = new User();
    }

    public onspecialist(event) {
        const value: string = event.target.value;
        if (value !== '0') {
            this.Spvalid = true;
        } else {
            this.Spvalid = false;
        }
      }

    public onhospital(event) {
        const value1: string = event.target.value;
        if (value1 !== '0') {
            this.Hsvalid = true;
        } else {
            this.Hsvalid = false;
        }
      }
}
