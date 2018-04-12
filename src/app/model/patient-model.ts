import { CommonModel } from './common-model';

export class PatientModelList extends CommonModel
{
    admissionDiagnosis:string;
    age:number;
    name:string;
    patientName:string;
    referringDate:Date;
    referringhospitalId:number;
    refralFromid:number;
    status:string;
}

export class PatientModel extends CommonModel {
    referHospitalId: number;
    referHospital: string;
    speciallistId: number;
    speciallist: string;
    docId: number;
    referConsulutantName: string ;
    admissionDiagnosis: string ;
    patientName: string ;
    civilId: number;
    gender: string;
    unit: string ;
    ward: string ;
    bed: string ;
    fileNo: string ;
    preMorbFunctionalStatus: string ;
    preMorbFunctionalConsciousStatus: string ;
    e: number;
    v: number;
    m: number;
    totalscore: number;
    durOfConventianalMechanicalVentination: number;
    spO: string ;
    pO: string ;
    fiO: string ;
    paofioratio: string ;
    pip: string ;
    peep: string ;
    tv: string ;
    rr: string ;
    lungCompliance: string ;
    cxrquadrants: string ;
    hr: string ;
    bp: string ;
    cvp: string ;
    temp: string ;
    co: string ;
    cardiacindex: string ;
    leftventricularejectionfraction: string ;
    Inotropesdose: string;
    Inotropesagent: string ;
    Sedationagent: string ;
    Sedationdose: string;
    musclerelaxantsagent: string ;
    musclerelaxantsdose: string;
    urea: string ;
    cr: string ;
    lactate: string ;
    uo: string ;
    dialysis: string ;
    bloodgasPH: string ;
    bloodgasPO: string ;
    bloodgasPCO: string ;
    bloodgasHCO: string ;
    bloodgasBE: string ;
    refdocdesignation: string ;
    refdoctelephone: string ;
    history: string ;
    transactiontype: null;
    sessid: null;
    RefDate: Date;
    refral_id: number;
    age: number;
    status: string;
}
