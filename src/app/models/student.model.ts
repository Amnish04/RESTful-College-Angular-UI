export interface Student {
    studentNum: number,
    firstName: string,
    lastName: string,
    email: string,
    addressStreet: string | null,
    addressCity: string | null,
    addressProvince: string | null,
    TA: boolean | null,
    status: string,
    course: number
}

export type Students = Student[];
