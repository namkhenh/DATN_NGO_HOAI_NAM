import { AccountStatus } from "../../pages/adminPageContainer/accountManagerPage/AccountManagerPage";
import { PermissionStatus } from "../../pages/adminPageContainer/addRolePage/AddRolePage";
import { HealthCareStatus } from "../../pages/adminPageContainer/healthCarePage/HealthCarePage";
import { PaidStatus } from "../../pages/adminPageContainer/paidDetailManagerPage/PaidDetailManagerPage";
import { RoleStatus } from "../../pages/adminPageContainer/roleManagerPage/RoleManagerPage";
import { AccountRoleEnum } from "./accPermissionEnum"
import { AppointmentStatus } from "./appointmentEnum"

export enum TableType {
    // PatientListTable,
    ApproveCalendarTable,
    AppointmentReceptionTable,
    PatientReceptionListTable,
    ServiceManagerTable,
    AddServiceManagerTable,
    PaidContentTable,
    PaidManagerTable,
    HealthCareTable,
    AccountManagerTable,
    RoleManagerTable,
    PermissionTable,
    UserAssignTable,
    AddUserAssignTable,
}

export interface ApproveCalendarTableColumns {
    appointmentCode: string
    appointmentTime: string
    appointmentStatus: JSX.Element
    patientCode: string
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
}

export interface ApproveCalendarTableDatas {
    appointmentId: string
    appointmentCode: string
    appointmentDate: string
    appointmentTime: string
    appointmentReason: string
    appointmentStatus: number
    patientId: string
    patientCode: string
    patientName: string
    patientAvatar?: string;
    patientDateOfBirth: string;
    patientGender: number;
    patientPhoneNumber?: string;
    patientIdentityNumber?: string;
    patientAddress: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelation?: string
}

export interface AppointmentReceptionTableColumns {
    appointmentCode: string
    appointmentTime: string
    patientCode: string
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
    patientIdentityNumber: string
    patientAddress: string
}

export interface AppointmentReceptionTableDatas {
    appointmentId: string
    appointmentCode: string
    appointmentDate: string
    appointmentTime: string
    appointmentReason: string
    appointmentStatus: number
    patientId: string
    patientCode: string
    patientName: string
    patientAvatar?: string;
    patientDateOfBirth: string;
    patientGender: number;
    patientPhoneNumber?: string;
    patientIdentityNumber?: string;
    patientAddress: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelation?: string
}

export interface PatientReceptionTableColumns {
    profileCode: string
    profileDate: string
    patientCode: string
    emergencyStatus: JSX.Element
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
}

export interface PatientReceptionTableDatas {
    profileId: string;
    profileCode: string;
    profileDate: string;
    profileTime: string;
    profileReason: string;
    patientId: string;
    patientCode: string;
    patientName: string;
    emergencyStatus: boolean
    patientAvatar?: string;
    patientDateOfBirth: string;
    patientGender: number;
    patientPhoneNumber?: string;
    patientIdentityNumber?: string;
    patientAddress: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelation?: string
}

export interface ServiceListTableColumns {
    serviceCode: string
    serviceName: string
    designatedRoom?: string
    designatedFaculty?: string
    designatedDoctor?: string
    serviceCost: string
    patientPaid?: string
    task?: JSX.Element
}

export interface ServiceListTableDatas {
    serviceId: string
    serviceCode: string
    serviceName: string
    designatedRoom?: string
    designatedFaculty?: string
    designatedDoctor?: string
    serviceCost: string
    patientPaid?: string
}

export interface PaidListTableColumns {
    profileCode: string
    patientCode: string
    profileDate: string
    profileTime: string
    paidStatus: JSX.Element
    patientName: string
    patientDateOfBirth: string
    patientPhone: string
}

export interface PaidListTableDatas {
    profileId: string
    profileCode: string
    patientId: string
    patientCode: string
    patientDateOfBirth: string
    patientPhone: string
    profileDate: string
    profileTime: string
    patientAddress: string
    paidStatus: PaidStatus
    paidContent?: ServiceListTableDatas[]
}

export interface HealthCareTableColumns {
    profileCode: string
    patientCode: string
    emergencyStatus: JSX.Element
    patientName: string
    serviceName: string
    healthCareStatus: string
    patientGender: string
    patientDateOfBirth: string
    patientPhoneNumber: string
}

export interface HealthCareTableDatas {
    profileId: string
    profileCode: string
    patientId: string
    patientCode: string
    emergencyStatus: boolean
    patientName: string
    serviceName: string
    healthCareStatus: number
    patientGender: number
    patientDateOfBirth: string
    patientPhoneNumber: string
}

export enum ApproveCalendarAction {
    Accept,
    Refuse,
    Cancel,
    Export
}

export interface AccountManagerTableColumns {
    userName: string
    role: string
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
    // startAt?: string
    // endAt?: string
    roles: IAppUserRole[]
    address?: string
    avatar?: string
    birthday?: string
    fullName: string
    phone?: string
    identify?: string
    gender?: UserGender
    status: AccountStatus
    // used: boolean
}

export interface RoleManagerTableColumns {
    roleCode: string
    roleName: string
    roleDescription: string
    roleStatus: JSX.Element
}
export interface RoleManagerTableDatas {
    id: string
    // appUserRoleMappings?: IAppUserRole[]
    code: string
    name: string
    description: string
    startDate?: Date
    endDate?: Date
    // permission?: PermissionManagerTableDatas[]
    status: boolean
    // used?: boolean
}

export interface MenuTableDatas {
    id: string
    code: string
    name: string
    path: string
    // isDeleted: boolean
    // actions?: ActionTableDatas[]
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
    name: string
    code: string
    path: string
    menuId: string
    status: boolean
    roleId: string
    startAt?: Date
    endAt?: Date
}

export interface ActionManagerTableColumns {
    actionName: string
}
export interface ActionTableDatas {
    id: string
    code: string
    name: string
    menuId: string
    path: string
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