import { AccountStatus } from "../../pages/adminPageContainer/accountManagerPage/AccountManagerPage";
import { PermissionStatus } from "../../pages/adminPageContainer/addRolePage/AddRolePage";
import { RoleStatus } from "../../pages/adminPageContainer/roleManagerPage/RoleManagerPage";
import { AccountRoleEnum } from "./accPermissionEnum"
import { AppointmentStatus } from "./appointmentEnum"

export enum TableType {
    PatientListTable,
    AccountManagerTable,
    RoleManagerTable,
    PermissionTable
}

export interface PatientListTableColumns {
    appointmentId: string;
    appointmentStatus: JSX.Element;
    appointmentDate: string;
    appointmentTime: string;
    patientId: string;
    patientName: string;
    patientDateOfBirth: string;
    patientSex: string;
    // patientPhoneNumber: string
    // patientIdentityNumber: string
    // patientAddress: string
}

export interface PatientListTableDatas {
    appointmentId: string;
    appointmentStatus: AppointmentStatus;
    appointmentDate: string;
    appointmentTime: string;
    appointmentReason: string;
    patientId: string;
    patientName: string;
    patientAvatar: string;
    patientDateOfBirth: string;
    patientSex: number;
    patientPhoneNumber: string
    patientIdentityNumber: string
    patientAddress: string
}

export interface AccountManagerTableColumns {
    userName: string
    role: JSX.Element
    fullName: string
    phoneNumber: string
    insuranceNumber: string
}

export enum PatientListAction {
    Accept,
    Refuse,
    Cancel,
    Export
}

export interface AccountManagerTableColumns {
    userName: string
    role: JSX.Element
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    gender: string
    status: JSX.Element
}

export interface AccountManagerTableDatas {
    userName: string
    role: AccountRoleEnum[]
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    gender: number
    status: AccountStatus
}

export interface RoleManagerTableColumns {
    roleId: string
    roleName: string
    roleStatus: JSX.Element
}
export interface RoleManagerTableDatas {
    roleId: string
    roleName: string
    roleStatus: RoleStatus
}

export interface PermissionManagerTableColumns {
    permissionId: string
    permissionName: string
    permissionMenu: string
    permissionStatus: JSX.Element
}
export interface PermissionManagerTableDatas {
    permissionId: string
    permissionName: string
    permissionStatus: PermissionStatus
}

export interface ActionManagerTableColumns {
    actionName: string
}
export interface ActionManagerTableDatas {
    actionId: string
    menuId: string
    actionName: string
}