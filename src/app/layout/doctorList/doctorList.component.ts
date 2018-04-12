import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DoctorService } from '../../service/doctorList-service';
import { DoctorModelList } from '../../model/doctor-model';

@Component({
    selector: 'app-tables',
    templateUrl: './doctorList.component.html',
    styleUrls: ['./doctorList.component.scss'],
    animations: [routerTransition()]
})
export class DoctorListComponent implements OnInit {
    
    transactiontype: string;
    sessid: string;
    errorMessage: any;
    doctors:DoctorModelList[];//PatientModel[];
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    constructor(private __doctorService: DoctorService) 
    {
        this.sessid = localStorage.getItem('sessid');
        this.transactiontype = "getdrdetail";
    }

    ngOnInit() {
        this.getDoctorList();
    }
    public getDoctorList()
    {
        debugger;
        this.__doctorService.getDoctorLists({'transactiontype': this.transactiontype,
        'sessid': this.sessid})
        .subscribe((res) => {
            debugger;
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                    this.doctors = res.data;
                }
                if (res.Result === 'FAILED') {
                    this.errorMessage = res.Result;
                }
            }
        });
    }


}
