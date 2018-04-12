import { CommonModel } from './common-model';

export class DoctorModelListIP extends CommonModel
{
    transactiontype:string;
    sessid:string;
}



export class DoctorModelList extends CommonModel
{
    docid:number;
    name:string;
    phone:number;
    email:string;
    user_type:number;
    hospital:string;
    specialist:string;
    status:string;
    regdate:Date;
}