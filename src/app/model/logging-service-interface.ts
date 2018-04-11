import { InjectionToken } from '@angular/core';

/** Interface definition for the logging service. */
export interface LoggingServiceInterface {
    /**
     * Log function to log the messages to logmsg function
     * @param message
     * The log message
     * rest parameters to accept any number of parameters given while calling logging function
     */
    log(...message: Array<{}>): void;
    /**
     * Log function to log the messages to logmsg function
     * @param message
     * The log message
     * rest parameters to accept any number of parameters given while calling logging function
     */
    info(...message: Array<{}>): void;
    /**
     * Log function to log warning message to logMsg function.
     * @param message
     * The log message
     */
    warn(...message: Array<{}>): void;
    /**
     * Log function to log error message to logMsg function.
     * @param message
     * The log message
     */
    error(...message: Array<{}>): void;
}
/** Common token definition used for injecting the interface in modules and specs. */
export const loggingToken: InjectionToken<LoggingServiceInterface> = new InjectionToken<LoggingServiceInterface>('app.logging');
