import React, {useEffect, useState} from 'react';
// import {TextField} from '../../../common/textField/TextField';
import './UserMainInfo.scss'
import {
    IDistrict,
    IProvince,
    IUserAddress,
    IUserInfoViewModel,
    UserAddressModelProperty,
    UserInfoModelProperty,
    UserSexView
} from '../../../model/apimodel/userInfo';
import {initializeIcons} from '@fluentui/font-icons-mdl2';
import {TextField} from '../../../common/textField/TextField';
import {Dropdown} from '../../../common/dropdown/DropDown';
import {DatePicker} from '../../../common/datePicker/DatePicker';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import Skeleton from '@mui/material/Skeleton';
import SubmitButton from '../../../common/button/SubmitButton';
import {ButtonVariantType, LoadingPosition} from '../../../model/enum/buttonEnum';

import {MessageBarStatus} from '../../../model/enum/messageBarEnum';
import {useStateValue} from '../../../context/StateProvider';
import {actionType} from '../../../context/Reducer';
import {
    isStringEmpty,
    validateNumberField,
    validateRequire,
    validateRequireLimitCharacter
} from '../../../utils/commonFunction';

initializeIcons();

interface IUserMainInfoState {
    userMainInfo: IUserInfoViewModel;
    errorMessageString: IUserMainInfoErrorMessage;
    addressOptions: IAddressOptions
    canEditDistrict: boolean
    canEditCommune: boolean
    loadingButton: boolean
    showMessage: boolean
}

interface IUserMainInfoProps {
    userMainInfo: IUserInfoViewModel
}

interface IAddressOptions {
    province: IDropdownOption[]
    district: IDropdownOption[]
    commune: IDropdownOption[]
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
    const [isLoading, setLoading] = useState<boolean>(true)
    const [state, setState] = useState<IUserMainInfoState>({
        userMainInfo: {
            id: props.userMainInfo?.id,
            userAvatar: props.userMainInfo?.userAvatar,
            userName: props.userMainInfo?.userName,
            userSex: props.userMainInfo?.userSex,
            userDateBirth: props.userMainInfo?.userDateBirth,
            userPhoneNumber: props.userMainInfo?.userPhoneNumber,
            userIdentityNumber: props.userMainInfo?.userIdentityNumber,
            userAddress: props.userMainInfo?.userAddress,
            userNational: props.userMainInfo?.userNational,
            userInsuranceNumber: props.userMainInfo?.userInsuranceNumber,
            // userEthnic: props.userMainInfo?.userEthnic,
            userReligion: props.userMainInfo?.userReligion,
            userJob: props.userMainInfo?.userJob,
            userCardPeriodFrom: props.userMainInfo?.userCardPeriodFrom,
            userCardPeriodTo: props.userMainInfo?.userCardPeriodTo
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
        addressOptions: {
            province: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
            district: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
            commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
        },
        canEditDistrict: false,
        canEditCommune: false,
        loadingButton: false,
        showMessage: false
    });

    const {userMainInfo, errorMessageString, canEditCommune, canEditDistrict, loadingButton} = state
    const {userAddress} = state.userMainInfo
    const {province, district, commune} = state.addressOptions

    useEffect(() => {
        setLoading(true)
        Promise.all([getProvinceOptions(), getDistrictOptions(Number(state.userMainInfo?.userAddress.province.key)), getCommuneOptions(Number(state.userMainInfo?.userAddress.district.key))]).then((res) => {
            if (res[0] && res[1] && res[2]) {
                setState({
                    ...state,
                    addressOptions: {
                        province: res[0],
                        district: res[1],
                        commune: res[2]
                    }
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const getProvinceOptions = async () => {
        const response: IProvince[] = await fetch('https://provinces.open-api.vn/api/?depth=1', {
            method: "GET",
        }).then((res) => res.json());
        let provinceOptions: IDropdownOption[] = []
        response.forEach(item => {
            provinceOptions.push({
                key: item.code,
                text: item.name
            })
        });
        return provinceOptions.sort((a, b) => a.text.replace("Tỉnh", "").replace("Thành phố", "").localeCompare(b.text.replace("Tỉnh", "").replace("Thành phố", "")))
    }

    const getDistrictOptions = async (provinceCode: number) => {
        const response: IProvince = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}/?depth=2`, {method: "GET",}).then((res) => res.json());
        let districtOptions: IDropdownOption[] = []
        response.districts.forEach(item => {
            districtOptions.push({
                key: item.code,
                text: item.name
            })
        });
        return districtOptions
    }

    const getCommuneOptions = async (districtCode: number) => {
        const response: IDistrict = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}/?depth=2`, {method: "GET",}).then((res) => res.json());
        let communeOptions: IDropdownOption[] = []
        response.wards.forEach(item => {
            communeOptions.push({
                key: item.code,
                text: item.name
            })
        });
        return communeOptions
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }

    const handleUpdateInfo = () => {
        const canUpdate = validateFunction()
        if (canUpdate) {
            let requestBody = {}
            const result = new Promise((resolve) => {
                setState({...state, loadingButton: true})
                setTimeout(() => {
                    setState({...state, loadingButton: false, showMessage: true})
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
            case UserInfoModelProperty.userName:
                return validateRequireLimitCharacter(value)
            case UserInfoModelProperty.userPhoneNumber:
                return validateNumberField(value, 10)
            case UserInfoModelProperty.userIdentityNumber:
                return validateNumberField(value, 12)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(userMainInfo.userName)
        let tempProvinceError = validateRequire(userMainInfo.userAddress.province.text)
        let tempDistrictError = validateRequire(userMainInfo.userAddress.district.text)
        let tempCommuneError = validateRequire(userMainInfo.userAddress.commune.text)
        // let tempDescriptionError = this.validateMaxLength(currentItem.description);
        // let tempTenantError = this.validateRequire(currentItem.tenant!.id);
        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(errorMessageString.userPhoneNumber) && isStringEmpty(errorMessageString.userIdentityNumber) && isStringEmpty(tempProvinceError) && isStringEmpty(tempDistrictError) && isStringEmpty(tempCommuneError)

        setState({
            ...state,
            errorMessageString: {
                ...state.errorMessageString,
                userName: tempNameError,
                userAddress: {
                    province: tempProvinceError,
                    district: tempDistrictError,
                    commune: tempCommuneError,
                }
            }
        })
        return passedVerify
    }

    useEffect(() => {
        if (props.userMainInfo.userAddress.province.key !== state.userMainInfo.userAddress.province.key) {
            setState({
                ...state,
                addressOptions: {
                    province: state.addressOptions.province,
                    district: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
                    commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
                },
                userMainInfo: {
                    ...state.userMainInfo,
                    userAddress: {
                        ...state.userMainInfo.userAddress,
                        district: {key: 0, text: ''},
                        commune: {key: 0, text: ''}
                    }
                },
                canEditDistrict: true,
                canEditCommune: false
            })
            getDistrictOptions(Number(state.userMainInfo.userAddress.province.key)).then((res) => {
                setState({
                    ...state,
                    addressOptions: {
                        ...state.addressOptions,
                        district: res,
                        commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
                    },
                    userMainInfo: {
                        ...state.userMainInfo,
                        userAddress: {
                            ...state.userMainInfo.userAddress,
                            district: {key: 0, text: ''},
                            commune: {key: 0, text: ''}
                        }
                    },
                    canEditDistrict: true,
                    canEditCommune: false
                })
            })
        }
    }, [userMainInfo.userAddress.province])

    useEffect(() => {
        if (props.userMainInfo.userAddress.district.key !== state.userMainInfo.userAddress.district.key) {
            setState({
                ...state,
                addressOptions: {
                    ...state.addressOptions,
                    district: state.addressOptions.district,
                    commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
                },
                userMainInfo: {
                    ...state.userMainInfo,
                    userAddress: {
                        ...state.userMainInfo.userAddress,
                        commune: {key: 0, text: ''}
                    }
                },
                canEditCommune: true
            })
            getCommuneOptions(Number(state.userMainInfo.userAddress.district.key)).then((res) => {
                setState({
                    ...state,
                    addressOptions: {
                        ...state.addressOptions,
                        commune: res,
                    },
                    canEditCommune: true
                })
            })
        }
        if (!state.userMainInfo.userAddress.district.key) {
            setState({
                ...state,
                addressOptions: {
                    ...state.addressOptions,
                    commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
                },
                userMainInfo: {
                    ...state.userMainInfo,
                    userAddress: {
                        ...state.userMainInfo.userAddress,

                        commune: {key: 0, text: ''}
                    }
                },
                canEditCommune: false
            })
        }
    }, [userMainInfo.userAddress.district])

    const onChangeAddress = (key: keyof IUserAddress, value: any) => {
        setState({
            ...state,
            userMainInfo: {
                ...state.userMainInfo,
                userAddress: {
                    ...state.userMainInfo.userAddress,
                    [key]: value
                }
            },
            errorMessageString: {
                ...state.errorMessageString,
                userAddress: {
                    ...state.errorMessageString.userAddress,
                    [key]: isStringEmpty(value?.text)
                }
            }
        })
    }
    return (
        <div className='user-main'>
            {isLoading ?
                <div className="user-main-container" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {Array.from({length: 5}).map((item, index) => (
                        <>
                            <Skeleton key={index} variant="rounded" width={300} height={72}
                                      style={{opacity: 1 - 0.15 * index}}/>
                            <Skeleton key={index} variant="rounded" width={300} height={72}
                                      style={{opacity: 1 - 0.15 * index}}/>
                        </>
                    ))}
                </div> :
                <div className='user-main-container'>
                    <div className="user-main-detail">
                        <TextField
                            label='Họ và tên'
                            placeholder='--'
                            required={true}
                            value={userMainInfo.userName}
                            onChange={(_, value) => {
                                onChangeOneField(UserInfoModelProperty.userName, value)
                            }}
                            errorMessage={errorMessageString.userName}
                        />
                    </div>
                    <div className="user-main-detail">
                        <Dropdown
                            placeholder="Chọn một giá trị"
                            label="Giới tính"
                            options={UserSexView}
                            selectedKey={userMainInfo.userSex}
                            required
                            onChange={(_, selected) => {
                                onChangeOneField(UserInfoModelProperty.userSex, Number(selected?.key))
                            }}
                            errorMessage={errorMessageString.userSex}
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
                                onChangeOneField(UserInfoModelProperty.userDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`)
                            }}
                            value={!!userMainInfo.userDateBirth ? new Date(userMainInfo.userDateBirth) : new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="user-main-detail">
                        <TextField
                            label='Tuổi'
                            required={true}
                            value={(new Date().getFullYear() - (!!userMainInfo.userDateBirth ? new Date(userMainInfo.userDateBirth).getFullYear() : new Date().getFullYear())).toString()}
                            readOnly
                        />
                    </div>
                    <div className="user-main-detail">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={userMainInfo.userPhoneNumber}
                            onChange={(_, value) => {
                                onChangeOneField(UserInfoModelProperty.userPhoneNumber, value)
                            }}
                            errorMessage={errorMessageString.userPhoneNumber}
                        />
                    </div>
                    <div className="user-main-detail">
                        <TextField
                            label='CMND/ CCCD'
                            placeholder='--'
                            value={userMainInfo.userIdentityNumber}
                            onChange={(_, value) => {
                                onChangeOneField(UserInfoModelProperty.userIdentityNumber, value)
                            }}
                            errorMessage={errorMessageString.userIdentityNumber}
                        />
                    </div>
                    <div className="user-main-detail">
                        <Dropdown
                            placeholder="--"
                            label="Tỉnh/ Thành phố"
                            options={province}
                            selectedKey={userAddress.province?.key}
                            required
                            onChange={(_, selected) => {
                                onChangeAddress(UserAddressModelProperty.province, selected)
                            }}
                            errorMessage={errorMessageString.userAddress.province}
                            // onFocus={this.getProvinceOptions.bind(this)}
                        />
                    </div>
                    <div className="user-main-detail">
                        <Dropdown
                            placeholder="--"
                            label="Huyện/ Quận"
                            options={district}
                            selectedKey={userAddress.district?.key}
                            required
                            defaultValue={"aaaaaaa"}
                            onChange={(_, selected) => {
                                onChangeAddress(UserAddressModelProperty.district, selected)
                            }}
                            errorMessage={errorMessageString.userAddress.district}
                            // onFocus={() => { this.getDistrictOptions.bind(this)(Number(userAddress.province?.key)) }}
                            disabled={!canEditDistrict}
                        />
                    </div>
                    <div className="user-main-detail">
                        <Dropdown
                            placeholder="--"
                            label="Xã/ Phường"
                            options={commune}
                            selectedKey={userAddress.commune?.key}
                            required
                            onChange={(_, selected) => {
                                onChangeAddress(UserAddressModelProperty.commune, selected)
                            }}
                            errorMessage={errorMessageString.userAddress.commune}
                            // onFocus={this.getCommuneOptions.bind(this)(Number(this.state.userMainInfo?.userAddress.province.key))}
                            disabled={!canEditCommune}
                        />
                    </div>
                    <div className="user-main-detail">
                        <TextField
                            label='Địa chỉ'
                            placeholder='--'
                            value={userMainInfo.userAddress.address}
                            onChange={(_, selected) => {
                                onChangeAddress(UserAddressModelProperty.address, selected)
                            }}
                            // errorMessage={errorMessageString.userAddress.address}
                        />
                    </div>
                </div>
            }
            <div className="update-button">
                <SubmitButton
                    id={'common-dialog-default'}
                    text={'Cập nhật thông tin'}
                    // disable={!canUpdate}
                    buttonVariantType={ButtonVariantType.Contained}
                    promise={handleUpdateInfo}
                    loading={loadingButton}
                    loadingPosition={LoadingPosition.Center}
                />
            </div>
            {/* <MessageBar ref={messageBarRef} message='aaa' status={MessageBarStatus.Success} /> */}
        </div>
    );

}

export default UserMainInfo;