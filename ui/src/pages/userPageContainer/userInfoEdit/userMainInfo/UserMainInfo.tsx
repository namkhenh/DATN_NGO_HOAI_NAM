import React, { useEffect, useState } from 'react';
// import {TextField} from '../../../common/textField/TextField';
import './UserMainInfo.scss'
import {
    ICommune,
    IDistrict,
    IProvince,
    IUserAddress,
    IUserInfoViewModel,
    UserAddressModelProperty,
    UserInfoDefaultView,
    UserInfoModelProperty,
    UserSexView
} from '../../../../model/apimodel/userInfo';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { TextField } from '../../../../common/textField/TextField';
import { Dropdown } from '../../../../common/dropdown/DropDown';
import { DatePicker } from '../../../../common/datePicker/DatePicker';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import Skeleton from '@mui/material/Skeleton';
import SubmitButton from '../../../../common/button/SubmitButton';
import { ButtonVariantType, LoadingPosition } from '../../../../model/enum/buttonEnum';

import { MessageBarStatus } from '../../../../model/enum/messageBarEnum';
import { useStateValue } from '../../../../context/StateProvider';
import { actionType } from '../../../../context/Reducer';
import {
    isStringEmpty,
    validateNumberField,
    validateRequire,
    validateRequireLimitCharacter
} from '../../../../utils/commonFunction';
import { AddressService, MenuService } from '../../../../api/apiPage/apiPage';
import { Autocomplete, TextField as TextFieldView } from '@mui/material';

initializeIcons();

interface IUserMainInfoState {
    userMainInfo: IUserInfoViewModel;
    errorMessageString: IUserMainInfoErrorMessage;
}

interface IUserMainInfoProps {
    userMainInfo: IUserInfoViewModel
}
interface IAddressErrorMessage {
    province: string
    district: string
    commune: string
}

interface IUserMainInfoErrorMessage {
    userName: string;
    userSex: string;
    userDateBirth: string;
    userPhoneNumber: string;
    userIdentityNumber: string;
    userAddress: IAddressErrorMessage
}

function UserMainInfo(props: IUserMainInfoProps) {
    // const messageBarRef = useRef<IMessageBar>(null);
    const [isLoadingButton, setLoadingButton] = useState<boolean>(false)
    const [listProvince, setListProvince] = useState<IProvince[]>()
    const [listDistrict, setListDistrict] = useState<IDistrict[]>()
    const [listWard, setListWard] = useState<ICommune[]>()
    const [provinceSelect, setProvinceSelect] = useState<IProvince>()
    const [districtSelect, setDistrictSelect] = useState<IDistrict>()
    const [wardSelect, setWardSelect] = useState<ICommune>()
    const [loadingDistrict, setloadingDis] = useState<boolean>(false)
    const [loadingCommune, setloadingCom] = useState<boolean>(false)
    const [state, setState] = useState<IUserMainInfoState>({
        userMainInfo: UserInfoDefaultView,
        errorMessageString: {
            userName: '',
            userSex: '',
            userDateBirth: '',
            userPhoneNumber: '',
            userIdentityNumber: '',
            userAddress: {
                province: '',
                commune: '',
                district: '',
            },
        },
    });

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    useEffect(() => {
        if (!!props.userMainInfo?.id) {
            setState({
                userMainInfo: {
                    id: props.userMainInfo?.id,
                    code: props.userMainInfo?.code,
                    userName: props.userMainInfo?.userName,
                    status: props.userMainInfo?.status,
                    phoneNumber: props.userMainInfo?.phoneNumber,
                    fullName: props.userMainInfo?.fullName,
                    email: props.userMainInfo?.email,
                    cmnd: props.userMainInfo?.cmnd,
                    dateOfBirth: props.userMainInfo?.dateOfBirth,
                    sex: props.userMainInfo?.sex,
                    provinceId: props.userMainInfo?.provinceId,
                    districtId: props.userMainInfo?.districtId,
                    wardId: props.userMainInfo?.wardId,
                    province: props.userMainInfo?.province,
                    district: props.userMainInfo?.district,
                    ward: props.userMainInfo?.ward,
                    address: '',
                    guardianName: '',
                    guardianPhone: '',
                    guardianRelation: '', 
                    roles: props.userMainInfo?.roles,
                    deleteAt: props.userMainInfo?.deleteAt,
                    createdDate: props.userMainInfo?.createdDate,
                    lastModifiedDate: props.userMainInfo?.lastModifiedDate,
                },
                errorMessageString: {
                    userName: '',
                    userSex: '',
                    userDateBirth: '',
                    userPhoneNumber: '',
                    userIdentityNumber: '',
                    userAddress: {
                        province: '',
                        commune: '',
                        district: '',
                    },
                },
            })
        }
    }, [props.userMainInfo?.id])

    useEffect(() => {
        AddressService.getProvince().then(res => {
            if (res.success) {
                let province: IProvince[] = []
                !!res.data && res.data.forEach((pr: any) => {
                    province.push({
                        id: pr.id,
                        code: pr.code,
                        name: pr.name,
                        codeName: pr.codeName,
                        divisonType: pr.division_Type,
                        phoneCode: pr.phone_Code
                    })
                })
                setListProvince(province)
            }
        })
    }, [])

    useEffect(() => {
        if (!!provinceSelect) {
            setloadingDis(true)
            setListDistrict([])
            AddressService.getDistrict(provinceSelect.id).then(res => {
                if (res.success) {
                    setloadingDis(false)
                    let district: IDistrict[] = []
                    !!res.data && res.data.forEach((dis: any) => {
                        district.push({
                            id: dis.id,
                            code: dis.code,
                            name: dis.name,
                            codeName: dis.codeName,
                            divisonType: dis.division_Type,
                            provinceId: dis.provinceId
                        })
                    })
                    setListDistrict(district)
                } else {
                    setloadingDis(false)
                }
            })
        } else {
            setDistrictSelect(undefined)
            setWardSelect(undefined)
            setListDistrict([])
            setListWard([])
        }

    }, [provinceSelect])

    useEffect(() => {
        if (!!districtSelect) {
            setloadingCom(true)
            setListWard([])
            AddressService.getCommune(districtSelect.id).then(res => {
                if (res.success) {
                    setloadingCom(false)
                    let commune: ICommune[] = []
                    !!res.data && res.data.forEach((com: any) => {
                        commune.push({
                            id: com.id,
                            code: com.code,
                            name: com.name,
                            codeName: com.codeName,
                            divisonType: com.division_Type,
                            districtId: com.districtId
                        })
                    })
                    setListWard(commune)
                } else {
                    setloadingDis(false)
                }
            })
        }

    }, [districtSelect])

    const handleUpdateInfo = () => {
        const canUpdate = validateFunction()
        console.log(canUpdate);
        
        if (canUpdate) {
            let requestBody = {
                id: state.userMainInfo?.id,
                code: state.userMainInfo?.code,
                fullName: state.userMainInfo?.fullName,
                status: state.userMainInfo?.status,
                description: "",
                email: state.userMainInfo?.email,
                userName: state.userMainInfo?.userName,
                phone: state.userMainInfo?.phoneNumber,
                sex: state.userMainInfo?.sex,
                religion: 0,
                provinceId: provinceSelect?.id,
                districtId: districtSelect?.id,
                wardId: wardSelect?.id,
                age: 0,
                dateOfBirth: state.userMainInfo?.dateOfBirth,
                cmnd: state.userMainInfo?.cmnd,
                guardiasName: '',
                guardiansPhoneNumber: '',
                relationship: ''
            }
            console.log(requestBody);
            
            const result = new Promise((resolve) => {
                setTimeout(() => {
                    showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                    resolve('success')
                }, 4000);
            }).then(() => {/*  */

            })

            return result
        }
        return new Promise((res) => {
        })
    }

    const onChangeOneField = (key: keyof IUserInfoViewModel, value: any) => {
        setState({
            ...state,
            userMainInfo: {
                ...state.userMainInfo,
                [key]: value
            },
            errorMessageString: {
                ...state.errorMessageString,
                [key]: validateField(key, value)
            }
        })
    }

    const validateField = (key: keyof IUserInfoViewModel, value: any) => {
        switch (key) {
            case UserInfoModelProperty.fullName:
                return validateRequireLimitCharacter(value)
            case UserInfoModelProperty.phoneNumber:
                return validateNumberField(value, 10)
            case UserInfoModelProperty.cmnd:
                return validateNumberField(value, 12)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(state.userMainInfo.fullName)
        // let tempDescriptionError = this.validateMaxLength(currentItem.description);
        // let tempTenantError = this.validateRequire(currentItem.tenant!.id);
        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(state.errorMessageString.userPhoneNumber) && isStringEmpty(state.errorMessageString.userIdentityNumber) 

        setState({
            ...state,
            errorMessageString: {
                ...state.errorMessageString,
                userName: tempNameError,
            }
        })
        return passedVerify
    }

    return (
        <div className='user-main'>

            <div className='user-main-container'>
                <div className="user-main-detail">
                    <TextField
                        label='Họ và tên'
                        placeholder='--'
                        required={true}
                        value={state.userMainInfo.fullName}
                        onChange={(_, value) => {
                            onChangeOneField(UserInfoModelProperty.fullName, value)
                        }}
                        errorMessage={state.errorMessageString.userName}
                    />
                </div>
                <div className="user-main-detail">
                    <Dropdown
                        placeholder="Chọn một giá trị"
                        label="Giới tính"
                        options={UserSexView}
                        selectedKey={state.userMainInfo.sex}
                        required
                        onChange={(_, selected) => {
                            onChangeOneField(UserInfoModelProperty.sex, Number(selected?.key))
                        }}
                        errorMessage={state.errorMessageString.userSex}
                    />
                </div>
                <div className="user-main-detail">
                    <DatePicker
                        placeholder="Chọn một giá trị"
                        ariaLabel="Chọn một giá trị"
                        label='Ngày sinh'
                        isRequired={true}
                        // strings={defaultDatePickerStrings}
                        onSelectDate={(date) => {
                            onChangeOneField(UserInfoModelProperty.dateOfBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`)
                        }}
                        value={!!state.userMainInfo.dateOfBirth ? new Date(state.userMainInfo.dateOfBirth) : new Date()}
                        // parseDateFromString={()}'
                        maxDate={new Date()}
                    />
                </div>
                <div className="user-main-detail">
                    <TextField
                        label='Tuổi'
                        required={true}
                        value={(new Date().getFullYear() - (!!state.userMainInfo.dateOfBirth ? new Date(state.userMainInfo.dateOfBirth).getFullYear() : new Date().getFullYear())).toString()}
                        readOnly
                    />
                </div>
                <div className="user-main-detail">
                    <TextField
                        label='Số điện thoại'
                        placeholder='--'
                        value={state.userMainInfo.phoneNumber}
                        onChange={(_, value) => {
                            onChangeOneField(UserInfoModelProperty.phoneNumber, value)
                        }}
                        errorMessage={state.errorMessageString.userPhoneNumber}
                    />
                </div>
                <div className="user-main-detail">
                    <TextField
                        label='CMND/ CCCD'
                        placeholder='--'
                        value={state.userMainInfo.cmnd}
                        onChange={(_, value) => {
                            onChangeOneField(UserInfoModelProperty.cmnd, value)
                        }}
                        errorMessage={state.errorMessageString.userIdentityNumber}
                    />
                </div>
                <div className="user-main-detail">
                    <Autocomplete
                        disablePortal
                        id="assignrole-box-select"
                        options={!!listProvince ? listProvince : []}
                        noOptionsText={'Không có lựa chọn'}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        sx={{}}
                        renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn tỉnh' />}
                        onChange={(_, selected) => {
                            setProvinceSelect(selected!)
                        }}
                        loading={listProvince?.length === 0}
                        loadingText={<>Vui lòng đợi...</>}
                    />
                </div>
                <div className="user-main-detail">
                    <Autocomplete
                        disablePortal
                        id="assignrole-box-select"
                        options={!!listDistrict ? listDistrict : []}
                        noOptionsText={'Không có lựa chọn'}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        sx={{}}
                        renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn huyện' />}
                        onChange={(_, selected) => {
                            setDistrictSelect(selected!)
                        }}
                        loading={loadingDistrict}
                        loadingText={<>Vui lòng đợi...</>}
                        disabled={!provinceSelect}
                    />
                </div>
                <div className="user-main-detail">
                    <Autocomplete
                        disablePortal
                        id="assignrole-box-select"
                        options={!!listWard ? listWard : []}
                        noOptionsText={'Không có lựa chọn'}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        sx={{}}
                        renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn xã' />}
                        onChange={(_, selected) => {
                            setWardSelect(selected!)
                        }}
                        loading={loadingCommune}
                        loadingText={<>Vui lòng đợi...</>}
                        disabled={!districtSelect}
                    />
                </div>
                {/* <div className="user-main-detail">
                        <TextField
                            label='Địa chỉ'
                            placeholder='--'
                            value={state.userMainInfo.userAddress.address}
                            onChange={(_, selected) => {
                                onChangeAddress(UserAddressModelProperty.address, selected)
                            }}
                            // errorMessage={state.errorMessageString.userAddress.address}
                        />
                    </div> */}
            </div>
            <div className="update-button">
                <SubmitButton
                    id={'common-dialog-default'}
                    text={'Cập nhật thông tin'}
                    // disable={!canUpdate}
                    buttonVariantType={ButtonVariantType.Contained}
                    promise={handleUpdateInfo}
                    loading={isLoadingButton}
                    loadingPosition={LoadingPosition.Center}
                />
            </div>
            {/* <MessageBar ref={messageBarRef} message='aaa' status={MessageBarStatus.Success} /> */}
        </div>
    );

}

export default UserMainInfo;