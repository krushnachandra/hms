import { SpecialistModel } from '../model/specialist-model';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
/**
 * Service provides Authentication and authorization.
 */
@Injectable()
export class PatientService {
    private BASE_URL = 'http://13.127.190.221';
    // inject http provider to service.
    constructor(private http: Http) {
    }
    /**
     * Returns the current login user.
     */
    public getPatientLists(specialist: any): Observable<any> {
        const url = `${this.BASE_URL}/hms/api/RefPatient/GetAllRefPatientList`;
        const body = JSON.stringify(specialist); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }

    public getStatusCount(specialist: any): Observable<any> {
        const url = `${this.BASE_URL}/hms/api/Common/GetStatusCount`;
        const body = JSON.stringify(specialist); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }

    public getPatientDetails(patient: any): Observable<any> {
        const url = `${this.BASE_URL}/hms/api/RefPatient/GetRefPatientDetails`;
        const body = JSON.stringify(patient); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }

    public patientStatusAction(patient: any): Observable<any> {
        const url = `${this.BASE_URL}/hms/api/RefPatient/AddUpdatePatientStatus`;
        const body = JSON.stringify(patient); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }
}
