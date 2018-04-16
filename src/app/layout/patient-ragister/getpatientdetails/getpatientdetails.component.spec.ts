import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from '../../../model/specialist-model';
import { HospitalModel } from '../../../model/hospital-model';
import { HospitalService } from '../../../service/hospital-service';
import { SpecialistService } from '../../../service/specialist-service';
import { routerTransition } from '../../../router.animations';
import { AuthenticationService } from '../../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PatientModel } from '../../../model/patient-model';
@Component({
    selector: 'app-getpatientdetails',
    templateUrl: './getpatientdetails.component.html',
    styleUrls: ['./getpatientdetails.component.scss']
})
export class GetPatientDetailsComponent1 implements OnInit {
    created_by: number;
    errorMessage: any;
    specialists: Array<SpecialistModel>;
    hospitals: Array<HospitalModel>;
    public _specialist: SpecialistModel = new SpecialistModel();
    public _hospital: HospitalModel = new HospitalModel();
    public _patient: PatientModel = new PatientModel();
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
        debugger;
        this._patient.transactiontype = 'insert';
        this._patient.sessid = localStorage.getItem('sessid');
        this._patient.referHospitalId = +localStorage.getItem('hospital_id');
        this._patient.speciallistId = +localStorage.getItem('specialist_id');
        this.created_by = +localStorage.getItem('created_by');
        if (this.created_by !== undefined) {
            this._patient.docId = this.created_by;
        }
        this._authenticationService.PatientRegister(this._patient)
            .subscribe((res) => {
                 if (res !== undefined) {
                    if (res.Result === 'Success') {
                        this.toastr.success(res.Result, res.Result);
                    }
                    if (res.Result === 'Failed') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
    }
    public reset() {
        this._patient = new PatientModel();
    }
}
