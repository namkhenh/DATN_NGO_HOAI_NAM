import {IDropdownOption} from "@fluentui/react";
import { RoleManagerTableDatas } from "../enum/tableTypeEnum";

export interface IUserAddress {
    province: IProvince;
    district: IDistrict;
    commune: ICommune;
    address?: string;
}

export interface IProvince {
    id: string
    code: number
    name: string
    codeName: string
    divisonType: string
    phoneCode: number
}

export const ProvinceDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    phoneCode:  0,
}

export interface IDistrict {
    id: string
    code: number
    name: string
    codeName: string
    divisonType: string
    provinceId: number
}

export const DistricDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    provinceId:  0,
}
export interface ICommune {
    id: string
    name: string
    code: number
    codeName: string
    divisonType: string
    districtId: number
}

export const CommuneDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    districtId:  0,
}

export interface ICountry {
    flag: string
    name: string
}

export interface IEthnic {
    id: number
    name: string
}

export interface IUserInfoViewModel {
    id: string;
    code: string;
    userName: string;
    status: boolean,
    phoneNumber: string;
    fullName: string;
    email: string;
    cmnd: string;
    dateOfBirth: Date;
    sex: number,
    provinceId: string;
    districtId: string;
    wardId: string;
    province: IProvince;
    district: IDistrict;
    ward: ICommune;
    address: string;
    religion: number
    roles: RoleManagerTableDatas[],
    guardianName: string,
    guardianPhone: string,
    guardianRelation: string,
}

export const UserInfoDefaultView = {
    id: '',
    code: '',
    userName: '',
    status: true,
    phoneNumber: '',
    fullName: '',
    email: '',
    cmnd: '',
    dateOfBirth:  new Date(),
    sex: 0,
    provinceId: '',
    districtId: '',
    wardId: '',
    province: ProvinceDefault,
    district: DistricDefault,
    ward: CommuneDefault,
    address: '',
    religion: 0,
    roles: [],
    guardianName: '',
    guardianPhone: '',
    guardianRelation: '',
}

export enum UserInfoModelProperty {
    id = 'id',
    code = 'code',
    userName = 'userName',
    status = 'status',
    phoneNumber = 'phoneNumber',
    fullName = 'fullName',
    email = 'email',
    cmnd = 'cmnd',
    dateOfBirth = 'dateOfBirth',
    sex = 'sex',
    provinceId = 'provinceId',
    districtId = 'districtId',
    wardId = 'wardId',
    province = 'province',
    district = 'district',
    ward = 'ward',
    address = 'address',
    religion = 'religion',
    roles = 'roles',
    guardianName = 'guardianName',
    guardianPhone = 'guardianPhone',
    guardianRelation = 'guardianRelation',
}

export enum UserAddressModelProperty {
    province = "province",
    district = "district",
    commune = "commune",
    address = "address",
}

export enum UserInfoDetailTabType {
    MainInfo = "0",
    OtherInfo = "1"
}

export const UserSexView = [
    {
        key: 0,
        text: 'Nam'
    },
    {
        key: 1,
        text: 'Nữ'
    }
]


export const UserDisableAcount = [
    {
        key: 0,
        text: 'Tôi muốn tạo tài khoản khác'
    },
    {
        key: 1,
        text: 'Xóa tài khoản vĩnh viễn, tôi sẽ quay lại sau'
    },
    {
        key: 2,
        text: 'Khác'
    }
]





