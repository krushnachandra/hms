import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from '../../model/specialist-model';
import { HospitalModel } from '../../model/hospital-model';
import { HospitalService } from '../../service/hospital-service';
import { SpecialistService } from '../../service/specialist-service';
import { routerTransition } from '../../router.animations';
import { User } from '../../model/user-model';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
    selector: 'app-doctor-ragister',
    templateUrl: './doctor-ragister.component.html',
    styleUrls: ['./doctor-ragister.component.scss']
})
export class DoctorRagisterComponent implements OnInit {
    created_by: number;
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
        this.created_by = +localStorage.getItem('created_by');
        if (this.created_by !== NaN) {
            this._user.created_by = this.created_by;
        }
        this._authenticationService.DoctorRegister(this._user)
            .subscribe((res) => {
                 if (res !== undefined) {
                    if (res.Result === 'success') {
                        this.toastr.success(res.Result, res.Result);
                        this.reset();
                    }
                    if (res.Result === 'failed') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
    }
    public reset() {
        this._user = new User();
    }
}
