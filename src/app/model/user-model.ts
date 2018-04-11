import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommonModel } from './common-model';

export class User  extends CommonModel {
    civilid: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    hospital_id: number;
    specialist_id: number;
    user_type: string;
    device_token: string;
    created_by: number;
    EditTime: string;
    EditHostName: string;
    EditHostAddress: string;
}
