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
    docType:boolean;
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
        if( localStorage.getItem('user_type') == "4" )
       {
       this. docType=true;
       }
       else
       {
        this. docType=false;
       }
    }

    ngOnInit() {
        this.getDoctorList();
    }
    public getDoctorList()
    {
        this.__doctorService.getDoctorLists({'transactiontype': this.transactiontype,
        'sessid': this.sessid})
        .subscribe((res) => {
            debugger;
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                   // this.doctors = res.data;
                   for(let i=0; i<res.data.length; i++)
                   {
                       if(res.data[i]["status"] == 0)
                       {
                            res.data[i]["status"] ="New";
                       }
                       else if(res.data[i]["status"] == 1)
                       {
                            res.data[i]["status"] ="Approved";
                       }
                       else if(res.data[i]["status"] == 2)
                       {
                            res.data[i]["status"] ="Rejected";
                       }

                       let docdata = res.data[i];
                       let doctorsArra:DoctorModelList[];
                       switch(docdata.status)
                       {
                           case "New":
                           case "Rejected":
                           this.doctors.push(Object.assign({action : "Approve"},docdata));
                           break;
                           case "Approved":
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

    public DocActionA(docdata:any)
    {
        debugger
        let action  =  "Approved";
        this.__doctorService.changeDoctorStatus({'docid':docdata.docid,'created_by': this.loginId,'transactiontype':action, 'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result.toUpperCase() === 'SUCCESS') {
                   // this.doctors = res.data;
                   let msg:string = '';
                   msg =  "Doctor Approved Successfuly.";
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

    public DocActionD(docdata:any)
    {
        debugger
        let action  =  "Disapproved";
        this.__doctorService.changeDoctorStatus({'docid':docdata.docid,'created_by': this.loginId,'transactiontype':action, 'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result.toUpperCase() === 'SUCCESS') {
                   // this.doctors = res.data;
                   let msg:string = '';
                   msg = "Doctor Disapproved Successfuly";
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
    public DocActionDel(docdata:any)
    {
        debugger
        let action  =  "Delete";
        this.__doctorService.changeDoctorStatus({'docid':docdata.docid,'created_by': this.loginId,'transactiontype':action, 'sessid': this.sessid})
        .subscribe((res) => {
            if (res !== undefined) {
                if (res.Result.toUpperCase() === 'SUCCESS') {
                   // this.doctors = res.data;
                   let msg:string = '';
                   msg = "Doctor Deleted Successfuly";
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
