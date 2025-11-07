export interface IRegisterData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    patronymic?: string;
}

export interface IRegisterResponse {
    errors?: string[]
}