import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommonModel } from './common-model';

export class UpdatePassword  extends CommonModel {
    civilid: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    hospital_id: number=0;
    specialist_id: number=0;
    user_type: string;
    device_token: string;
    created_by: number;
    EditTime: string;
    EditHostName: string;
    EditHostAddress: string;
}
