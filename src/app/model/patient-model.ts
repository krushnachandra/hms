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
    civil_id: string;
    isresend: string;
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
    Inotropesagent4:  string;
    Inotropesdose4:  string;
    Inotropesagent5:  string;
    Inotropesdose5:  string;
    Sedationagent1:  string;
    Sedationdose1:  string;
    Sedationagent2:  string;
    Sedationdose2:  string;
    Sedationagent3:  string;
    Sedationdose3:  string;
    Sedationagent4:  string;
    Sedationdose4:  string;
    Sedationagent5:  string;
    Sedationdose5:  string;
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
    file1:string;
    file2:string;
    file3:string;
    murrayscore: string;
  Prone_Positioning: string;
  Prone_Positioning_improv: string;
  Nitric_Acid	: string;
  Nitric_Acid_improv	: string;
  Plasmaphersis	: string;
  Plasmaphersis_improv: string;
  Therapuetic_Hypothermia	: string;
  Therapuetic_Hypothermia_improv	: string;
  Others	: string;
  Others_improv: string;
  abg_lactate: string;
  bg_sao2: string;
  bg_spo2: string;
  Inotropes_dose_1_value : string;
  Inotropes_dose_2_value : string;
  Inotropes_dose_3_value : string;
  Inotropes_dose_4_value : string;
  Inotropes_dose_5_value : string;
  Sedation_dose_1_value : string;
  Sedation_dose_2_value : string;
  Sedation_dose_3_value : string;
  Sedation_dose_4_value : string;
  Sedation_dose_5_value : string;
  Inotropes_agent_1_others: string;
  Inotropes_agent_2_others: string;
  Inotropes_agent_3_others: string;
  Inotropes_agent_4_others: string;
  Inotropes_agent_5_others: string;
  Sedation_agent_1_others: string;
	Sedation_agent_2_others: string;
	Sedation_agent_3_others: string;
	Sedation_agent_4_others: string;
	Sedation_agent_5_others: string;

}

 export class PatientModel extends CommonModel {
  referHospitalId: number=0;
  speciallistId: number=0;
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
  bp1:  string;
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
  Inotropesagent4: string;
  Inotropesdose4: string;
  Inotropesagent5: string;
  Inotropesdose5: string;
  Sedationagent1: string;
  Sedationdose1: string;
  Sedationagent2: string;
  Sedationdose2: string ;
  Sedationagent3: string;
  Sedationdose3: string;
  Sedationagent4: string;
  Sedationdose4: string;
  Sedationagent5: string;
  Sedationdose5: string;
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
  RefDate: string = new Date().toLocaleDateString('en-GB');
  age: number;
  refral_id: number;
  comments: string;
  action: number;
  telephone: number;
  designation: string;
  resend:string="0";
  murrayscore: string;
  Prone_Positioning: string;
  Prone_Positioning_improv: string;
    Nitric_Acid	: string;
    Nitric_Acid_improv	: string;
    Plasmaphersis	: string;
    Plasmaphersis_improv: string;
    Therapuetic_Hypothermia	: string;
    Therapuetic_Hypothermia_improv	: string;
    Others	: string;
    Others_improv: string;
    abg_lactate: string;
    bg_sao2: string;
    bg_spo2: string;
    
  Inotropes_dose_1_value : string;
  Inotropes_dose_2_value : string;
  Inotropes_dose_3_value : string;
  Inotropes_dose_4_value : string;
  Inotropes_dose_5_value : string;
  Sedation_dose_1_value : string;
  Sedation_dose_2_value : string;
  Sedation_dose_3_value : string;
  Sedation_dose_4_value : string;
  Sedation_dose_5_value : string;
	Inotropes_agent_1_others: string;
	Inotropes_agent_2_others: string;
	Inotropes_agent_3_others: string;
	Inotropes_agent_4_others: string;
	Inotropes_agent_5_others: string;
	Sedation_agent_1_others: string;
	Sedation_agent_2_others: string;
	Sedation_agent_3_others: string;
	Sedation_agent_4_others: string;
	Sedation_agent_5_others: string;
}
