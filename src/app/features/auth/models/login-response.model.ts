import { Role } from './role.model';

export interface LoginResponseModel {

  token: string;

  name: string;

  email: string;

  role: Role;

  message: string;

}