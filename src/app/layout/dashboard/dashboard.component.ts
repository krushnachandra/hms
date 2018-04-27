import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PatientService } from '../../service/patient-service';
import { PatientModel } from '../../model/patient-model';
import { PatientModelList } from '../../model/patient-model';
import { Router } from '@angular/router';
import {Pushwoosh} from 'web-push-notifications';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    statusCount: any;
    docType: boolean;
    sessid: string;
    errorMessage: any;
    patients: PatientModelList[] = [];
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    patientsNew: PatientModelList[] = [];
    public pwInstance: Pushwoosh = new Pushwoosh();
    constructor(public router: Router, private _patientService: PatientService) {
       this.sessid = localStorage.getItem('sessid');
       if ( localStorage.getItem('user_type') === '3' ) {
       this. docType = true;
       } else {
        this. docType = false;
       }
       this.pwInstance.push(['init', {
        logLevel: 'info', // or debug
        applicationCode: 'E8803-68B8E',
        safariWebsitePushID: 'web.com.example.domain',
        defaultNotificationTitle: 'Pushwoosh',
        defaultNotificationImage: 'https://yoursite.com/img/logo-medium.png',
        autoSubscribe: true,
        userId: 'user_id',
        tags: {
            'Name': 'John Smith'
        }
    }]);

    }

    public ngOnInit() {

        // call the method on initial load of page to bind drop down
        if ( localStorage.getItem('user_type') === '4' ) {
        this.router.navigateByUrl('doctorList');
       }
       this.getHospgetPatientsitals();
       this.getStatusCount();
    }
    public getHospgetPatientsitals() {
        // this._patient.sessid = 'E7F75D55-C483-43BD-ACF5-FB3ADFF51C02';
        this._patientService.getPatientLists({'transactiontype': 'getpatientdetail',
        'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {

                    //this.patients = res.data;
                    //this.patientsNew = res.data;
                    for (let i = 0; i < res.data.length; i++) {
                        let docdata = res.data[i];
                        switch (docdata.status) {
                            case "New":
                            case "Approved":
                            this.patients.push(Object.assign({action : ""}, docdata));
                            this.patientsNew.push(Object.assign({action : ""}, docdata));
                            break;
                            case "Reject":
                            case "Hold":
                            case 1:
                            this.patients.push(Object.assign({action : "Resend"}, docdata));
                            this.patientsNew.push(Object.assign({action : 'Resend'}, docdata));
                            break;
                            default:
                            break;
                        }
                    }
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
    public filter(status: string) {

        this.patients = this.patientsNew ;
        this.patients = this.patients.filter(x => x.status === status);
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    public setPatientObject(patient: PatientModel) {
        localStorage.setItem('patient', JSON.stringify(patient));
    }
}
