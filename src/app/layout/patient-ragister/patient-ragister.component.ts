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
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';
@Component({
    selector: 'app-patient-ragister',
    templateUrl: './patient-ragister.component.html',
    styleUrls: ['./patient-ragister.component.scss']
})
export class PatientRagisterComponent implements OnInit {
    bp1:any;
    bp2:any;
    Spvalid:boolean=true;
    Hsvalid:boolean=true;
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
    guid :string;
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
        //this.age();
        this._patient.referHospitalId = parseInt(localStorage.getItem('hospital_id'));
        this._patient.speciallistId = parseInt(localStorage.getItem('specialist_id'));
    }
    public getPatientDetails(id: number) {
        this.sessid = localStorage.getItem('sessid');
        this.transactiontype = "getpatientinfo";
        debugger;
        this.refral_id = id.toString();
        this._patient.resend = id.toString();
        this._patientService.getPatientDetails({
            'transactiontype': this.transactiontype,
            'sessid': this.sessid, "refral_id": this.refral_id
        }).subscribe((res) => {
            if (res !== undefined) {
                if (res.Result === 'SUCCESS') {
                    this._patient = res.data[0];
                    let toArray =  this._patient.bp.split("-");

                    this._patient.bp = toArray[0];
                    this._patient.bp1 = toArray[1];

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
        debugger;
        this._patient.transactiontype = 'insert';
        this._patient.sessid = localStorage.getItem('sessid');
        this.created_by = +localStorage.getItem('created_by');
        this._patient.resend= this.pageNum.toString();
        if (this.created_by !== undefined) {
            this._patient.docId = this.created_by;
        }

        if(this._patient.referHospitalId == 0) 
        {
            this.Hsvalid = false;
        }
        if(this._patient.speciallistId == 0) 
        {
            this.Spvalid = false;
        }
       
    if(this.Hsvalid && this.Spvalid){
        debugger;
        this._authenticationService.PatientRegister(this._patient)
            .subscribe((res) => {
                debugger;
                 if (res !== undefined) {
                    if (res.Result === 'Success') {
                        this.toastr.success(res.Result, res.Result);
                        this.router.navigateByUrl('dashboard');
                        //this.reset();
                    }
                    if (res.Result === 'Failed') {
                        this.toastr.error(res.Result, res.Result);
                    }
                }
            });
        }
    }
    public reset() {
        this._patient = new PatientModel();
        this._patient.referConsulutantName = localStorage.getItem('user');
    }

    public onCivilIdChange(val)
    {
    debugger;
        if(val.length == 12)
        {
            debugger;
            this.cidyy = +val.substr(1, 2);//+this._patient.civilId.substr(1, 2);
            const c = new Date();
            this.year = +c.getFullYear();
            let smallYear:number = +c.getFullYear().toString().substr(-2);

            if(this.cidyy <= smallYear)
            {
                const x = this.year - (2000 + this.cidyy);
                this._patient.age = x;
            }
            else //if (this.cidyy <= this.year) 
            {
                const x = this.year - (1900 + this.cidyy);
                this._patient.age = x;
            }
        }
        else
        {
            this.toastr.error("Enter 12 digit CivilId.", "Error");
        }
    }
    
    
    public onEVMChanged()
    {
        
        let E:string = "0";
        let V:string = "0";
        let M:string = "0";

        E = this._patient.e == undefined ? E : this._patient.e.substr(0,1);
        V = this._patient.v == undefined ? V : this._patient.v.substr(0,1);
        M = this._patient.m == undefined ? M : this._patient.m.substr(0,1);

        let totalscore:number = parseInt(E)+parseInt(V)+parseInt(M);
        this._patient.totalscore = totalscore.toString()+"/15";
    }


    public PaO2FiO2ratio(ev,val)
    {
        
        let runtimeVarible ;
        let op = 0;
        if(val == 1)
        {
            if(typeof ev!='undefined' && ev)
            {
                runtimeVarible = this._patient.spO2 == undefined ? 0 : this._patient.spO2;
                if(runtimeVarible > 0)
                {
                    op =  ev /runtimeVarible;
                }
                else    {op = ev;}
            }
        }
        else if(val == 2)
        {
            if(typeof ev!='undefined' && ev)
            {
                runtimeVarible = this._patient.pO2 == undefined ? 0 : this._patient.pO2;
                if(runtimeVarible > 0)
                {
                    op = runtimeVarible /ev;
                }
                else    
                {
                    op = ev;
                }
            }
        }

        if(op < 13)
        {
            this._patient.pao2fio2ratio = op + "kp 100";
        }
        else if(op >= 13 && op < 23)
        {
            this._patient.pao2fio2ratio =  op + "kp 100-174";
        }
        else if(op >= 23 && op < 30)
        {
            this._patient.pao2fio2ratio = op + "kp 175-224";
        }
        else if(op >= 30 && op < 40)
        {
            this._patient.pao2fio2ratio = op + "kp 225-229";
        }
        else if( op> 40)
        {
            this._patient.pao2fio2ratio = op + "kp 300";
        }
    }

    public LungComplianceCalc(ev)
    {
        
        let pipval:number = this._patient.pip == undefined ? 0 : parseInt(this._patient.pip);
        let peepval:number = this._patient.peep == undefined ? 0 : parseInt(this._patient.peep);
        let tvval:number = this._patient.tv == undefined ? 0 : parseInt(this._patient.tv);;

        let OP:any = (tvval/ (pipval-peepval)).toString();

        if(OP == Infinity)
        {
            this._patient.lungCompliance = "";
        }
        else
        {
            this._patient.lungCompliance = OP;
        }
    }

    public onspecialist(event) {
        var value:string = event.target.value;
        if(value !="0")
        {
            this.Spvalid = true;
        }else
        {
            this.Spvalid = false;
        }
      }

    public onhospital(event) {
        var value1:string = event.target.value;
        if(value1 !="0")
        {
            this.Hsvalid = true;
        }else
        {
            this.Hsvalid = false;
        }
      }

      public fileChange(event,value)
      {
          debugger;
          if (value == 1)
          {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) 
            {
                debugger;
                let file: File = fileList[0];  
                let formData: FormData = new FormData();  
                formData.append('file', file); 
                formData.append('guid',localStorage.getItem('sessid'));
                formData.append('filetype','1');
                formData.append('docid',localStorage.getItem('created_by'));
                this._patientService.patientFileUpload(formData)
                .subscribe((res) => {
                    debugger;
                     if (res !== undefined) {
                        if (res.Result === 'SUCCESS') {
                            this.toastr.success("File Uploaded Successfully.", res.Result);
                        }
                        if (res.Result === 'FAILED') {
                            this.toastr.error("File Uploaded Failed.", res.Result);
                        }
                    }
                });
            }
          }
          else if (value == 2)
          {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) 
            {
                let file: File = fileList[0];  
                let formData: FormData = new FormData();  
                formData.append('file', file); 
                formData.append('guid',localStorage.getItem('sessid'));
                formData.append('filetype','2');
                formData.append('docid',localStorage.getItem('created_by'));
                this._patientService.patientFileUpload(formData)
                .subscribe((res) => {
                     if (res !== undefined) {
                        if (res.Result === 'SUCCESS') {
                            this.toastr.success("File Uploaded Successfully.", res.Result);
                        }
                        if (res.Result === 'FAILED') {
                            this.toastr.error("File Uploaded Failed.", res.Result);
                        }
                    }
                });
            }
          }
          else if (value == 3)
          {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) 
            {
                let file: File = fileList[0];  
                let formData: FormData = new FormData();  
                formData.append('file', file); 
                formData.append('guid',localStorage.getItem('sessid'));
                formData.append('filetype','3');
                formData.append('docid',localStorage.getItem('created_by'));
                this._patientService.patientFileUpload(formData)
                .subscribe((res) => {
                     if (res !== undefined) {
                        if (res.Result === 'SUCCESS') {
                            this.toastr.success("File Uploaded Successfully.", res.Result);
                        }
                        if (res.Result === 'FAILED') {
                            this.toastr.error("File Uploaded Failed.", res.Result);
                        }
                    }
                });
            }
          }
      }
}
