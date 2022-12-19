import { ErrorMessageConfig } from 'src/app/utilities/helper-types';
import { ErrorTypes } from './enums';
import { cloneDeep } from 'lodash';
/**
 * Check if parameter neither null nor undefined
 */
export function isDefNotNull(value: any): boolean {
    return value !== null && value !== undefined;
}

/**
 * 
 * @param obj 
 * @returns The list of values for key-value pairs the object holds
 */
export function getObjectValues(obj: any) {
    return Object.values(obj);
}

/**
 * @param obj - Object that needs to be copiedd
 * @returns Copy of the passed object
 */
export function getCopy<T>(obj: T, useLodash: boolean = false): T {
    let copy: T;
    copy = useLodash ? cloneDeep(obj) : JSON.parse(JSON.stringify(obj));
    return copy;
}

/**
 * 
 * @param type Type of the message that needs to be generated
 * @param fieldName Field that the message needs to generated for. Default is 'field'
 * @param options Configuration for more complex error messages like 'maxlength' and 'minlength'
 * @returns The custom generated error message based on supplied params
 */
export function getErrorMessage(type: ErrorTypes, fieldName: string = 'Field', options: ErrorMessageConfig = {}) {
    let message;

    switch(type) {
        case ErrorTypes.Required:
            message = `${fieldName} is required!`;
            break;
        case ErrorTypes.MaxLength:
            message = `${fieldName} cannot have more than ${options.maxlength} characters!`;
            break;
        case ErrorTypes.Email:
            message = `${fieldName} is not in correct email format!`;
            break;
        default:
            message = `Something is wrong with this field!`;
            break;
    }

    return message;
}
