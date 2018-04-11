import { CommonModel } from './common-model';

/**
 * This model represent the login credential information that the user has to
 * send the Authentication server.
 */
export class LoginCredentials extends CommonModel {
    /**
     * @description This is the username information of the user
     * @type {string}
     */
    email: string;
    /**
     * @description This is password  information of the user
     * @type {string}
     */
    password: string;
    /**
     * @description Holds the Transaction information of the user
     * @type {boolean}
     */
    transactiontype: string;
     /**
     * @description Holds the sess id information of the user
     * @type {boolean}
     */
    sessid: string;
}
