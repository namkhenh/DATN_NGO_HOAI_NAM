import { AccountStatus } from "../../pages/adminPageContainer/accountManagerPage/AccountManagerPage";
import { PermissionStatus } from "../../pages/adminPageContainer/addRolePage/AddRolePage";
import { RoleStatus } from "../../pages/adminPageContainer/roleManagerPage/RoleManagerPage";
import { AccountRoleEnum } from "./accPermissionEnum"
import { AppointmentStatus } from "./appointmentEnum"

export enum TableType {
    PatientListTable,
    AccountManagerTable,
    RoleManagerTable,
    PermissionTable,
    UserAssignTable,
    AddUserAssignTable,
}

export interface PatientListTableColumns {
    appointmentCode: string;
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
    appointmentCode: string;
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

export interface IUserRole {
    id: string
    code: string
    name: string
    status: RoleStatus
}

export enum UserGender {
    Male,
    Female
}

export interface IAppUserRole {
    appUserId: string
    role: IUserRole
    roleId: string
}
export interface AccountManagerTableDatas {
    id: string
    userName: string
    startAt?: string
    endAt?: string
    appUserRoleMappings: IAppUserRole[]
    address?: string
    avatar?: string
    birthday?: string
    fullName: string
    phone?: string
    insurance?: string
    gender?: UserGender
    status: AccountStatus
    used: boolean
}

export interface RoleManagerTableColumns {
    roleCode: string
    roleName: string
    roleStatus: JSX.Element
}
export interface RoleManagerTableDatas {
    id: string
    appUserRoleMappings?: IAppUserRole[]
    code: string
    name: string
    startAt?: string
    endAt?: string
    permission?: PermissionManagerTableDatas[]
    status: RoleStatus
    used?: boolean
}

export interface MenuTableDatas {
    id: string
    code: string
    name: string
    isDeleted: boolean
    actions?: ActionTableDatas[]
}
export interface PermissionActionTableDatas {
    action: ActionTableDatas
    actionId: string
    isLocked: boolean
    permissionId: string
}

export interface PermissionManagerTableColumns {
    permissionCode: string
    permissionName: string
    permissionMenu: string
    permissionStatus: JSX.Element
}
export interface PermissionManagerTableDatas {
    id: string
    code: string
    menu: MenuTableDatas
    menuId: string
    name: string
    status: PermissionStatus
    permissionActionMapping?: PermissionActionTableDatas[]
    roleId: string
    startAt?: string
    endAt?: string
}

export interface ActionManagerTableColumns {
    actionName: string
}
export interface ActionTableDatas {
    id: string
    name: string
    isDeleted: boolean
    menuId: string
}

export interface UserAssignTableColumns {
    userName: string
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    task?: JSX.Element
}
export interface UserAssignTableDatas {
    id: string
    userName: string
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    gender: number
    status: AccountStatus
    address?: string
    birthday?: string
}