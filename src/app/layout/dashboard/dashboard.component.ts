import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PatientService } from '../../service/patient-service';
import { PatientModel } from '../../model/patient-model';
import { PatientModelList } from '../../model/patient-model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    statusCount: any;

    sessid: string;
    errorMessage: any;
    patients: PatientModelList[];//PatientModel[];
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor(private _patientService: PatientService) {
       this.sessid = localStorage.getItem('sessid');
    }

    public ngOnInit() {
        // call the method on initial load of page to bind drop down
        this.getHospgetPatientsitals();
        this.getStatusCount();

    }
    public getHospgetPatientsitals() {
        debugger;
        // this._patient.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._patientService.getPatientLists({'transactiontype': 'getpatientdetail',
        'sessid': this.sessid})
        .subscribe((res) => {
            debugger;
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                    this.patients = res.data;
                }
                if (res.Result === 'FAILED') {
                    this.errorMessage = res.Result;
                }
            }
        });
    }
     public getStatusCount(): any {
         this._patientService.getStatusCount({
             'sessid': this.sessid
         }).subscribe((res) => {
             debugger;
             if (res !== undefined) {
                 if (res.Result === 'SUCCESS') {
                     this.statusCount = res.data;
                 }
                 if (res.Result === 'FAILED') {
                     this.errorMessage = res.Result;
                 }
             }
         });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
