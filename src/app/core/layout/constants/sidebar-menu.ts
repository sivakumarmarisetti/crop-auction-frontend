import { Role } from '../../../features/auth/models/role.model';

export interface SidebarMenu {

  label: string;

  icon: string;

  route: string;

  roles: Role[];

}