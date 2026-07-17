import { Role } from '../../auth/models/role.model';
import { UserStatus } from './user-status';

export interface UserResponseModel {

  id: number;

  name: string;

  email: string;

  mobile: string;

  aadhaarNumber: string;

  role: Role;

  status: UserStatus;

}