/**
 * This model represent the login credential information that the user has to
 * send the Authentication server.
 */
export class HospitalModel {
    id: number;
    name: string;
    password: string;
    transactiontype: string;
    sessid: string;
}
