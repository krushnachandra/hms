import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginCredentials } from '../model/login-credentials';
import { User } from '../model/user-model';

/**
 * Service provides Authentication and authorization.
 */
@Injectable()
export class AuthenticationService {
    private BASE_URL = 'http://13.127.190.221';
    // inject http provider to service.
    constructor(private http: Http) {
    }
    /**
     * LogIn function to check and authenticate the user.
     * @param loginCredentials
     * The LoginCredentials object data.
     * @memberof AuthenticationService
     */
    public logIn(loginCredentials: LoginCredentials): Observable<User> {
        const url = `${this.BASE_URL}/hms/api/Common/DocLogin`;
        const bodyString = JSON.stringify(loginCredentials); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, bodyString, options) // ...using post request
            .map((res: Response) => res.json().data) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }
    /**
     * Register function to Register the user.
     * @param userData
     * The UserModel object data.
     * @memberof AuthenticationService
     */
    public Register(userData: User): Observable<User> {
        const url = `${this.BASE_URL}/hms/api/Common/AddUpdateDoctor`;
        const body = JSON.stringify(userData); // Stringify payload
        const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, body, options) // ...using post request
            .map((res: Response) => res.json().data) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // errors if any
    }
}
