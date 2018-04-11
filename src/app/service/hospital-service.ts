import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoggingServiceInterface, loggingToken } from '../model/logging-service-interface';
import { HospitalModel } from '../model/hospital-model';
/**
 * Service provides Authentication and authorization.
 */
@Injectable()
export class HospitalService {
    private BASE_URL = 'http://13.127.190.221';
    // inject http provider to service.
    constructor(private http: Http) {
    }
    /**
     * Returns the current login user.
     */
    public getHospitals(hospitals: HospitalModel): Observable<Array<HospitalModel>> {
        const url = `${this.BASE_URL}/hms/api/Common/GetHospitalLIst`;
        const body = JSON.stringify(hospitals); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json().data) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }
}
