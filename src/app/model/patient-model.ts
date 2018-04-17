import { CommonModel } from './common-model';

export class PatientModelList extends CommonModel {
    admissionDiagnosis: string;
    age: number;
    name: string;
    patientName: string;
    referringDate: Date;
    referringhospitalId: number;
    refralFromid: number;
    status: string;
    action: string;
}

export class PatientDetailReq extends CommonModel
{
    action:string;
    comment:string;
}

export class PatientDetail extends CommonModel
{
    //referHospitalId: 1,
    referHospital: string;
    //speciallistId: 2,
    speciallist:  string;
    //docId: 6,
    referConsulutantName:  string;
    admissionDiagnosis:  string;
    patientName:  string;
    civilId:  string;
    gender:  string;
    unit:  string;
    ward:  string;
    bed:  string;
    fileNo:  string;
    preMorbFunctionalStatus:  string;
    preMorbFunctionalConsciousStatus:  string;
    e:   string;
    v:  string;
    m: string;
    totalscore:  string;
    durOfConventianalMechanicalVentination: string;
    spO2:  string;
    pO2:  string;
    fiO2:  string;
    pao2fio2ratio:  string;
    pip:  string;
    peep:  string;
    tv:  string;
    rr:  string;
    lungCompliance:  string;
    cxrquadrants:  string;
    hr:  string;
    bp:  string;
    cvp:  string;
    temp:  string;
    co:  string;
    cardiacindex:  string;
    leftventricularejectionfraction:  string;
    Inotropesagent1:  string;
    Inotropesdose1:  string;
    Inotropesagent2:  string;
    Inotropesdose2:  string;
    Inotropesagent3:  string;
    Inotropesdose3:  string;
    Sedationagent1:  string;
    Sedationdose1:  string;
    Sedationagent2:  string;
    Sedationdose2:  string;
    Sedationagent3:  string;
    Sedationdose3:  string;
    musclerelaxantsagent1:  string;
    musclerelaxantsdose1:  string;
    urea:  string;
    cr:  string;
    lactate:  string;
    uo:  string;
    dialysis:  string;
    bloodgasPH: string;
    bloodgasPO2:  string;
    bloodgasPCO2:  string;
    bloodgasHCO3:  string;
    bloodgasBE:  string;
    refdocdesignation:  string;
    refdoctelephone:  string;
    history:  string;
    RefDate:  string;
    age:  string;
    status:  string;
    action:string = "0";
    comment:string;
}

 export class PatientModel extends CommonModel {
  referHospitalId: number;
  speciallistId: number;
  docId: number;
  referConsulutantName: string ;
  admissionDiagnosis: string ;
  patientName: string ;
  civilId: string;
  gender: string ;
  unit: string ;
  ward: string ;
  bed: string ;
  fileNo: string ;
  preMorbFunctionalStatus: string;
  preMorbFunctionalConsciousStatus: string;
  e: string ;
  v: string ;
  m: string ;
  totalscore: string;
  durOfConventianalMechanicalVentination: 21;
  spO2: string ;
  pO2: string ;
  fiO2: string ;
  pao2fio2ratio: string;
  pip: string ;
  peep: string ;
  tv: string ;
  rr: string;
  lungCompliance: string;
  cxrquadrants: string;
  hr: string;
  bp: string;
  cvp: string;
  temp: string;
  co: string;
  cardiacindex: string;
  leftventricularejectionfraction: string;
  Inotropesagent1: string;
  Inotropesdose1: string;
  Inotropesagent2: string;
  Inotropesdose2: string;
  Inotropesagent3: string;
  Inotropesdose3: string;
  Sedationagent1: string;
  Sedationdose1: string;
  Sedationagent2: string;
  Sedationdose2: string ;
  Sedationagent3: string;
  Sedationdose3: string;
  musclerelaxantsagent1: string;
  musclerelaxantsdose1: string;
  urea: string;
  cr: string;
  lactate: string;
  uo: string;
  dialysis: string;
  bloodgasPH: string;
  bloodgasPO2: string;
  bloodgasPCO2: string;
  bloodgasHCO3: string;
  bloodgasBE: string;
  refdocdesignation: string;
  refdoctelephone: string;
  history: string;
  transactiontype: string;
  sessid: string;
  RefDate: Date = new Date();
  age: number;
  refral_id: number;
  comments: string;
  action: number;
}
