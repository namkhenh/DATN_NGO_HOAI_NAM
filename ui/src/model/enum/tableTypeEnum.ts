import { AccountRoleEnum } from "./accPermissionEnum"
import { AppointmentStatus } from "./appointmentEnum"

export enum TableType {
    PatientListTable,
    AccountManagerTable,
    RoleManagerTable
}

export interface PatientListTableColumns {
  appointmentId: string;
  appointmentStatus: string;
  dateAppointment: string;
  timeAppointment: string;
  patientId: string;
  patientName: string;
  patientDateOfBirth: string;
  patientSex: string;
  // patientPhoneNumber: string
  // patientIdentityNumber: string
  // patientAddress: string
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
}

export interface RoleManagerTableColumns {
    userName: string
    add: JSX.Element
    edit: JSX.Element
    remove: JSX.Element
}