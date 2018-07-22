/**
 * This model represent the login credential information that the user has to
 * send the Authentication server.
 */
export class SpecialistModel {
    id: number;
    name: string;
    password: string;
    transactiontype: string;
    sessid: string;
    actiontype:string;
}

export class InotropesModel {
    id: number;
    name: string;
    actiontype:string;
}

export class SedationModel {
    id: number;
    name: string;
    actiontype:string;
}

export class UnitsModel {
    id: number;
    name: string;
    actiontype:string;
}
