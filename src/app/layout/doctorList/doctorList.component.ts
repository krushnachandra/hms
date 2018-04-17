import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DoctorService } from '../../service/doctorList-service';
import { DoctorModelList } from '../../model/doctor-model';
import { DoctorStatusChange } from '../../model/doctor-model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tables',
    templateUrl: './doctorList.component.html',
    styleUrls: ['./doctorList.component.scss'],
    animations: [routerTransition()]
})
export class DoctorListComponent implements OnInit {
    
    loginId:number;
    transactiontype: string;
    sessid: string;
    errorMessage: any;
    doctors:DoctorModelList[] = [];//PatientModel[];
    doctorstatus:DoctorStatusChange[] = [];//PatientModel[];
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    constructor(private __doctorService: DoctorService,private toastr: ToastrService) 
    {
        this.sessid = localStorage.getItem('sessid');
        this.transactiontype = "getdrdetail";
        this.loginId = parseInt(localStorage.getItem('created_by'));
    }

    ngOnInit() {
        this.getDoctorList();
    }
    public getDoctorList()
    {
        this.__doctorService.getDoctorLists({'transactiontype': this.transactiontype,
        'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                   // this.doctors = res.data;
                   for(let i=0; i<res.data.length; i++)
                   {
                       let docdata = res.data[i];
                       let doctorsArra:DoctorModelList[];
                       switch(docdata.status)
                       {
                           case 0:
                           case 2:
                           this.doctors.push(Object.assign({action : "Approve"},docdata));
                           break;
                           case 1:
                           this.doctors.push(Object.assign({action : "Disapprove"},docdata));
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

    public DocAction(docdata:any)
    {
        debugger
        let action  =  docdata.action == "Disapprove"?"Disapproved":"Approved";
        this.__doctorService.changeDoctorStatus({'docid':docdata.docid,'created_by': this.loginId,'transactiontype':action, 'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result.toUpperCase() === 'SUCCESS') {
                   // this.doctors = res.data;
                   let msg:string = '';
                   msg = docdata.action == "Disapprove"?"Doctor Disapproved Successfuly.":"Doctor Approved Successfuly.";
                   this.toastr.success(msg, 'Success');
                }
                if (res.Result.toUpperCase() === 'FAILED') {
                    //this.errorMessage = res.Result;
                    this.toastr.error(res.Result, res.Result);
                }
                this.doctors = [];
                this.getDoctorList();
            }
        });
    }


}
