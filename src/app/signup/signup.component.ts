import { SpecialistModel } from '../model/specialist-model';
import { HospitalModel } from '../model/hospital-model';
import { HospitalService } from '../service/hospital-service';
import { SpecialistService } from '../service/specialist-service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { User } from '../model/user-model';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    errorMessage: any;
    specialists: Array<SpecialistModel>;
    hospitals: Array<HospitalModel>;
    public _specialist: SpecialistModel = new SpecialistModel();
    public _hospital: HospitalModel = new HospitalModel();
    public _user: User = new User();
    constructor(public router: Router,
        private _authenticationService: AuthenticationService,
        private _hospitalService: HospitalService,
        private _specialistService: SpecialistService,
        private toastr: ToastrService) { }

    public ngOnInit() {
        // call the method on initial load of page to bind drop down
        this.getHospitals();
        this.getSpecialists();

    }
    public getHospitals() {
        this._hospital.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._hospitalService.getHospitals(this._hospital).subscribe(
            res => this.hospitals = res,
            error => this.errorMessage = <any>error);
    }
    public getSpecialists() {
        this._specialist.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._specialistService.getSpecialists(this._specialist).subscribe(
            res => this.specialists = res,
            error => this.errorMessage = <any>error
        );
    }
    public onRegister() {
        this._user.transactiontype = 'insert';
        this._user.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._authenticationService.Register(this._user)
            .subscribe((res) => {
                debugger;
                if (res !== undefined) {
                    if (res.Result === 'SUCCESS') {
                        this.toastr.error(res.Result, res.Result);
                        this.router.navigateByUrl('login');
                    }
                    if (res.Result === 'FAILED') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
        }
}
