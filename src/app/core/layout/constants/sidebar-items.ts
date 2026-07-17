import { SidebarMenu } from './sidebar-menu';
import { APP_ROUTES } from '../../constants/app-routes';
import { Role } from '../../../features/auth/models/role.model';

export const SIDEBAR_ITEMS: SidebarMenu[] = [

  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: APP_ROUTES.ADMIN.DASHBOARD,
    roles: [Role.ADMIN]
  },

  {
    label: 'Pending Users',
    icon: 'people',
    route: APP_ROUTES.ADMIN.PENDING_USERS,
    roles: [Role.ADMIN]
  },

  {
    label: 'Auction Requests',
    icon: 'pending_actions',
    route: APP_ROUTES.ADMIN.PENDING_AUCTION_REQUESTS,
    roles: [Role.ADMIN]
  },

  {
    label: 'Auctions',
    icon: 'gavel',
    route: APP_ROUTES.ADMIN.AUCTIONS,
    roles: [Role.ADMIN]
  },

  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: APP_ROUTES.FARMER.DASHBOARD,
    roles: [Role.FARMER]
  },

  {
    label: 'Add Crop',
    icon: 'add_circle',
    route: APP_ROUTES.FARMER.ADD_CROP,
    roles: [Role.FARMER]
  },

  {
    label: 'My Crops',
    icon: 'grass',
    route: APP_ROUTES.FARMER.MY_CROPS,
    roles: [Role.FARMER]
  },

  {
    label: 'Auction Requests',
    icon: 'send',
    route: APP_ROUTES.FARMER.MY_AUCTION_REQUESTS,
    roles: [Role.FARMER]
  },

  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: APP_ROUTES.BUYER.DASHBOARD,
    roles: [Role.BUYER]
  },

  {
    label: 'Available Crops',
    icon: 'agriculture',
    route: APP_ROUTES.BUYER.AVAILABLE_CROPS,
    roles: [Role.BUYER]
  }

];