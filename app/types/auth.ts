export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
}

export interface IRegisterResponse {
  errors?: string[];
}
export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  errors?: string[];
}
