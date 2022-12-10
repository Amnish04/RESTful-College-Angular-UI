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
