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
