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
    patients: PatientModelList[] = [];//PatientModel[];
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    patientsNew: PatientModelList[] = [];

    constructor(private _patientService: PatientService) {
       this.sessid = localStorage.getItem('sessid');
    }

    public ngOnInit() {
        // call the method on initial load of page to bind drop down
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
                    debugger;
                    //this.patients = res.data;
                    //this.patientsNew = res.data;
                    for(let i=0; i<res.data.length; i++)
                    {
                        let docdata = res.data[i];
                        switch(docdata.status)
                        {
                            case "New":
                            case "Approved":
                            this.patients.push(Object.assign({action : ""},docdata));
                            this.patientsNew.push(Object.assign({action : ""},docdata));
                            break;
                            case "Reject":
                            case "Hold":
                            case 1:
                            this.patients.push(Object.assign({action : "Resend"},docdata));
                            this.patientsNew.push(Object.assign({action : 'Resend'},docdata));
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
