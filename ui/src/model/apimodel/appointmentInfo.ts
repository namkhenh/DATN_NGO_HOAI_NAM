import { AppointmentStatus } from "../enum/appointmentEnum";
import { ICountry, IUserAddress } from "./userInfo";

export interface IAppointmenViewModel {
    patientId?: string;
    patientAvatar?: string;
    patientName: string;
    patientBirth: string;
    patientSex: number;
    patientPhone: string
    patientAddress: IUserAddress
    appointmentDate: string
    appointmentTime: number
    appointmentReason: string
    appointmentStatus?: AppointmentStatus
    appointmentId?: string
    appointmentNumber?: number
}

export interface IPatientProfileViewModel {
    patientId: string;
    patientAvatar?: string;
    patientName: string;
    patientSex: number;
    patientDateBirth: string;
    patientPhoneNumber?: string
    patientIdentityNumber?: string;
    patientAddress: IUserAddress;
    guardianName?: string
    guardianPhone?: string
    guardianRelation?: string
}

export enum PatientProfileModelProperty {
    patientId = "patientId",
    patientAvatar = "patientAvatar",
    patientName = "patientName",
    patientSex = "patientSex",
    patientDateBirth = "patientDateBirth",
    patientPhoneNumber = "patientPhoneNumber",
    patientIdentityNumber = "patientIdentityNumber",
    patientAddress = "patientAddress",
    guardianName = "guardianName",
    guardianPhone = "guardianPhone",
    guardianRelation = "guardianRelation",
}

export const PatientProfileDefaultView = {
    patientId: "",
    patientAvatar: "",
    patientName: "",
    patientSex: 0,
    patientDateBirth: "",
    patientPhoneNumber: "",
    patientIdentityNumber: "",
    patientAddress: {
        province: {
            key: 0,
            text: ''
        },
        district: {
            key: 0,
            text: ''
        },
        commune: {
            key: 0,
            text: ''
        },
        address: ''
    },
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
}


export interface IAppointmentInfo {
    appointmentDate: string
    appointmentTime: number
    appointmentReason: string
}

export enum AppointmentInfoModelProperty {
    appointmentDate = "appointmentDate",
    appointmentTime = "appointmentTime",
    appointmentReason = "appointmentReason",
}