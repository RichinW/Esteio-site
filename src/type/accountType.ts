import { PermissionOut } from "./permissionType";

export interface AccountOut {
  id: number;
  username: string,
  email: string;
  permissions?: PermissionOut[]
  password?: string
  confirm_password?: string
}

export interface AccountIn {
  username: string,
  email: string;
  permissions?: PermissionOut[]
  password?: string
  confirm_password?: string
}