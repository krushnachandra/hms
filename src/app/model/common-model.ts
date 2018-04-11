/**
 * This model represent the login credential information that the user has to
 * send the Authentication server.
 */
export class CommonModel {
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
