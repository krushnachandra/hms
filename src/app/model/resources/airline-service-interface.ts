import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs/Observable";

export interface Airline {
    Id :number,
    AirlineIataCode: string,
    AirlineAccountingCode: string,
    AirlineIcaoCode: string,
    AirlineName: string,
    AirlineDescription: string,
    RowStatusTypeId: number,
    CustomProperty: string,
    EditUserId: number,
    EditVersion: string,
    EditTime: string,
    EditHostName: string,
    EditHostAddress: string

}

export interface AirlineServiceInterface {

    getAirlineData(): Observable<Airline>

}

/** Common token definition used for injecting the interface in modules and specs. */
export const airlineServiceToken: InjectionToken<AirlineServiceInterface > = new InjectionToken<AirlineServiceInterface >('app.logging');
