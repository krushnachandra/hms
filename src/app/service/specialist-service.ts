import { SpecialistModel } from '../model/specialist-model';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
/**
 * Service provides Authentication and authorization.
 */
@Injectable()
export class SpecialistService {
    private BASE_URL = 'http://13.127.190.221';
    // inject http provider to service.
    constructor(private http: Http) {
    }
    /**
     * Returns the current login user.
     */
    public getSpecialists(specialist: SpecialistModel): Observable<Array<SpecialistModel>> {
        const url = `${this.BASE_URL}/hms/api/Common/GetSpecialistLIst`;
        const body = JSON.stringify(specialist); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json().data) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }
}
