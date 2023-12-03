export interface AuthData {
  email: string;
  password: string;
}
export interface AuthRegisterData extends AuthData {
  firstname: string;
  lastname: string;
}
