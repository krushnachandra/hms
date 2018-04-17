import { Component, OnInit } from '@angular/core';
import { SpecialistModel } from '../../model/specialist-model';
import { HospitalModel } from '../../model/hospital-model';
import { HospitalService } from '../../service/hospital-service';
import { SpecialistService } from '../../service/specialist-service';
import { routerTransition } from '../../router.animations';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientModel } from '../../model/patient-model';
import { PatientService } from '../../service/patient-service';
@Component({
    selector: 'app-patient-ragister',
    templateUrl: './patient-ragister.component.html',
    styleUrls: ['./patient-ragister.component.scss']
})
export class PatientRagisterComponent implements OnInit {
    patientDetail: any;
    refral_id: string;
    transactiontype: string;
    sessid: string;
    pageNum: number;
    patientid: any;
    year: number;
    cidyy: number;
    referConsulutantName: string;
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
        private toastr: ToastrService,
        private _activatedRoute: ActivatedRoute,
        private _patientService: PatientService
    ) {
            this.patientid = this._activatedRoute.queryParams
                    .subscribe(params => {
                     this.pageNum = +params['patid']});
        this.getPatientDetails(this.pageNum);
         }

    public ngOnInit() {
        // call the method on initial load of page to bind drop down
        this.getHospitals();
        this.getSpecialists();
        this._patient.referConsulutantName = localStorage.getItem('user');
        this.age();
        //this._patient = JSON.parse(localStorage.getItem('patient'));

    }
    public getPatientDetails(id: number) {
        debugger;
        this.sessid = localStorage.getItem('sessid');
        this.transactiontype = "getpatientinfo";
        this.refral_id = id.toString();
        this._patientService.getPatientDetails({
            'transactiontype': this.transactiontype,
            'sessid': this.sessid, "refral_id": this.refral_id
        }).subscribe((res) => {
                debugger;
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                    debugger;
                    this._patient = res.data[0];
                } else if (res.Result === 'FAILED') {
                    this.errorMessage = res.Result;
                }
            } else {
                this.errorMessage = 'Some error occured.Please try again after sometime.';
            }
        });
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
        this._patient.transactiontype = 'insert';
        this._patient.sessid = localStorage.getItem('sessid');
        this.created_by = +localStorage.getItem('created_by');
        if (this.created_by !== undefined) {
            this._patient.docId = this.created_by;
        }
        this._authenticationService.PatientRegister(this._patient)
            .subscribe((res) => {
                 if (res !== undefined) {
                    if (res.Result === 'Success') {
                        this.toastr.success(res.Result, res.Result);
                        this.reset();
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

    public age() {
        this.cidyy = +this._patient.civilId.substr(1, 2);
        const c = new Date();
        this.year = +c.getFullYear();
        if (this.cidyy <= this.year) {
            const x = this.year - (1900 + this.cidyy);
            this._patient.age = x;
            }
    }
}
