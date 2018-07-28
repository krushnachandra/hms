import { Component, OnInit } from '@angular/core';
import { SpecialistModel, InotropesModel, SedationModel, UnitsModel } from '../../../model/specialist-model';
import { HospitalModel } from '../../../model/hospital-model';
import { HospitalService } from '../../../service/hospital-service';
import { SpecialistService } from '../../../service/specialist-service';
import { PatientService } from '../../../service/patient-service';
import { routerTransition } from '../../../router.animations';
import { AuthenticationService } from '../../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router} from '@angular/router';
import { PatientModel } from '../../../model/patient-model';
import { PatientDetail } from '../../../model/patient-model';
import { PatientDetailReq } from '../../../model/patient-model';


@Component({
    selector: 'app-getpatientdetails',
    templateUrl: './getpatientdetails.component.html',
    styleUrls: ['./getpatientdetails.component.scss']
})
export class GetPatientDetailsComponent1 implements OnInit {
    transactiontype: string;
    sessid: string;
    refral_id: string;
    patientid:any;
    pageNum=0;
    docType:boolean;
    created_by: number;
    errorMessage: any;
    IsDocAvailable1:boolean=true;
    IsDocAvailable2:boolean=true;
    IsDocAvailable3:boolean=true;
    specialists: Array<SpecialistModel>;
    hospitals: Array<HospitalModel>;
    inotropes: Array<InotropesModel>;
    Sedation: Array<SedationModel>;
    units: Array<UnitsModel>;
    patientDetail: PatientDetail = new PatientDetail();
    public _PatientDetailReq: PatientDetail = new PatientDetail();
    public _specialist: SpecialistModel = new SpecialistModel();
    public _hospital: HospitalModel = new HospitalModel();
    public _patient: PatientModel = new PatientModel();
    public _inotropes: InotropesModel = new InotropesModel();
    public _Sedation: SedationModel = new SedationModel();
    public _unit: UnitsModel = new UnitsModel();
    constructor(public router: Router,
        private _authenticationService: AuthenticationService,
        private _hospitalService: HospitalService,
        private _specialistService: SpecialistService,
        private toastr: ToastrService,private _activatedRoute: ActivatedRoute,private _patientService:PatientService) { }
        
    public ngOnInit() {
        
        if( localStorage.getItem('user_type') == "1" || localStorage.getItem('user_type') == "4" )
        {
        this. docType=true;
        }
        else
        {
         this. docType=false;
        }
        this.getHospitals();
        this.getSpecialists();
        this.getInotropesList();
        this.getSedationList();
        this.getUnitsList();
        this.patientid = this._activatedRoute.queryParams
                    .subscribe(params => {
                     this.pageNum = +params['patid']});
        this.getPatientDetails(this.pageNum);
    }
    public getInotropesList()
    {
        
        this._inotropes.actiontype = 'inotropes';
        this._specialistService.getInotropesList(this._inotropes).subscribe(
            res => this.inotropes = res,
            error => this.errorMessage = <any>error
        );
    }

    public getSedationList()
    {
        this._Sedation.actiontype = 'sedation';
        this._specialistService.getSedationList(this._Sedation).subscribe(
            res => this.Sedation = res,
            error => this.errorMessage = <any>error
        );
    }

    public getUnitsList()
    {
        debugger;

        this._unit.actiontype = 'units';
        this._specialistService.getIUnitsList(this._unit).subscribe(
            res => this.units = res,
            error => this.errorMessage = <any>error
        );
    }
    public getPatientDetails(id:number)
    {
        
        this.sessid = localStorage.getItem('sessid');
        this.transactiontype = "getpatientinfo";
        this.refral_id = id.toString();
        this._patientService.getPatientDetails ({'transactiontype': this.transactiontype,
        'sessid': this.sessid,"refral_id": this.refral_id})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                    this.patientDetail = res.data[0];
                    
                }
                else if (res.Result === 'FAILED') {
                    this.errorMessage = res.Result;
                }
            }
            else
            {
                this.errorMessage = "Some error occured.Please try again after sometime.";
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
    public onApproved() {
        
        this._patientService.patientStatusAction({'sessid':  localStorage.getItem('sessid'),
        'action':this._PatientDetailReq.action,
        'transactiontype': 'insertaction',
        'refral_id': this.pageNum,
        'comment':this._PatientDetailReq.comment,
        }).subscribe((res) => {

                 if (res !== undefined) {
                    if (res.Result.toUpperCase() === 'SUCCESS') {
                        this.toastr.success('Status changed succssfully.', res.Result);
                        this.router.navigateByUrl('dashboard');
                    }
                    if (res.Result.toUpperCase() === 'FAILED') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
                if (res.Result === 'not authorised to do so') {
                    this.toastr.error('You not authorised to do so.', res.Result);
                }
            });
    }
    public reset() {
        this._patient = new PatientModel();
    }
}
