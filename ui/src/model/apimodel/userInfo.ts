import { IDropdownOption } from "@fluentui/react";

export interface IUserAddress {
    province: IDropdownOption;
    district: IDropdownOption;
    commune: IDropdownOption;
    address?: string;
}

export interface IProvince {
    name: string
    code: number
    divisonType: string
    codeName: string
    phoneCode: number
    districts: IDistrict[]
}

export interface IDistrict {
    name: string
    code: number
    divisonType: string
    codeName: string
    provinceCode: number
    wards: ICommune[]
}

export interface ICommune {
    name: string
    code: number
    divisonType: string
    codeName: string
    districtCode: number
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
    userAvatar: string;
    userName: string;
    userSex: number;
    userDateBirth: string;
    userPhoneNumber: string
    userIdentityNumber: string;
    userAddress: IUserAddress;
    userNational: ICountry;
    userInsuranceNumber: string;
    // userEthnic: IEthnic;
    userReligion: string;
    userJob: string;
    userCardPeriodFrom: string
    userCardPeriodTo: string
}

export const UserInfoDefaultView = {
    id: "",
    userAvatar: "",
    userName: "",
    userSex: 0,
    userDateBirth: "",
    userPhoneNumber: "",
    userIdentityNumber: "",
    userAddress: {
        province: "",
        district: "",
        commune: "",
        address: ""
    },
    userNational: "",
    userInsuranceNumber: "",
    // userEthnic: "",
    userReligion: "",
    userJob: "",
    userCardPeriodFrom: "",
    userCardPeriodTo: "",
}

export enum UserInfoModelProperty {
    userAvatar = "userAvatar",
    userName = "userName",
    userSex = "userSex",
    userDateBirth = "userDateBirth",
    userPhoneNumber = "userPhoneNumber",
    userIdentityNumber = "userIdentityNumber",
    userAddress = "userAddress",
    userNational = "userNational",
    userInsuranceNumber = "userInsuranceNumber",
    // userEthnic = "userEthnic",
    userReligion = "userReligion",
    userJob = "userJob",
    userCardPeriodFrom = "userCardPeriodFrom",
    userCardPeriodTo = "userCardPeriodTo",
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





