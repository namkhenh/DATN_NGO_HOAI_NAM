import React, {useEffect, useState} from 'react'

import {ICommune, IDistrict, IProvince, IUserAddress, IUserInfoViewModel, UserAddressModelProperty, UserInfoDefaultView, UserInfoModelProperty, UserSexView} from '../../model/apimodel/userInfo';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import {TextField} from '../../common/textField/TextField';
import {Dropdown} from '../../common/dropdown/DropDown';
import {DatePicker} from '../../common/datePicker/DatePicker';
import {ProfileAction} from '../../model/enum/appointmentEnum';
import Skeleton from '@mui/material/Skeleton';
import DialogView from '../../common/dialog/Dialog';
import './BookingForm.scss'
import {
    isStringEmpty,
    validateNumberField,
    validateRequire,
    validateRequireLimitCharacter,
    validateRequireLimitCharacterForm
} from '../../utils/commonFunction';
import {useStateValue} from '../../context/StateProvider';
import {actionType} from '../../context/Reducer';
import {MessageBarStatus} from '../../model/enum/messageBarEnum';
import { Autocomplete, TextField as TextFieldView } from '@mui/material';

interface BookingFormState {
    // currentPatientProfile: IPatientProfileViewModel
    // errorMessageFormString: IFormErrorMessage;
    addressOptions: IAddressOptions
    canEditDistrict: boolean
    canEditCommune: boolean
    loadingButton: boolean
    showMessage: boolean
}

interface IAddressOptions {
    province: IDropdownOption[]
    district: IDropdownOption[]
    commune: IDropdownOption[]
}

interface BookingFormProps {
    currentPatientProfile: IUserInfoViewModel
    openForm: boolean
    profileAction?: ProfileAction
    closeForm: () => void
}

interface IFormErrorMessage {
    patientName: string;
    patientSex: string;
    patientDateBirth: string;
    patientPhoneNumber: string;
    patientIdentityNumber: string;
    patientAddress: IAddressErrorMessage
    guardianName: string
    guardianPhone: string
    guardianRelation: string
}

interface IAddressErrorMessage {
    province: string
    district: string
    commune: string
}

function BookingForm(props: BookingFormProps) {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isOpen, setOpen] = useState<boolean>(props.openForm)
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    const [listProvince, setListProvince] = useState<IProvince[]>()
    const [listDistrict, setListDistrict] = useState<IDistrict[]>()
    const [listWard, setListWard] = useState<ICommune[]>()
    const [provinceSelect, setProvinceSelect] = useState<IProvince>()
    const [districtSelect, setDistrictSelect] = useState<IDistrict>()
    const [wardSelect, setWardSelect] = useState<ICommune>()
    const [loadingDistrict, setloadingDis] = useState<boolean>(false)
    const [loadingCommune, setloadingCom] = useState<boolean>(false)
    const [currentPatientProfile, setCurrentPatient] = useState<IUserInfoViewModel>(UserInfoDefaultView);
    const [errorMessageFormString, setErrorMessage] = useState<IFormErrorMessage>({
        patientName: '',
        patientSex: '',
        patientDateBirth: '',
        patientPhoneNumber: '',
        patientIdentityNumber: '',
        patientAddress: {
            province: '',
            commune: '',
            district: '',
        },
        guardianName: '',
        guardianPhone: '',
        guardianRelation: ''
    })
    const [state, setState] = useState<BookingFormState>({
        showMessage: false,
        addressOptions: {
            province: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }],
            district: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }],
            commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
        },
        canEditDistrict: false,
        canEditCommune: false,
        loadingButton: false,
    })
    
    useEffect(() => {
        if (props.openForm) {
            setLoading(true)
            setOpen(true)
            setCurrentPatient({
                id: props.currentPatientProfile?.id,
                code: props.currentPatientProfile?.code,
                userName: props.currentPatientProfile?.userName,
                status: props.currentPatientProfile?.status,
                phoneNumber: props.currentPatientProfile?.phoneNumber,
                fullName: props.currentPatientProfile?.fullName,
                email: props.currentPatientProfile?.email,
                cmnd: props.currentPatientProfile?.cmnd,
                dateOfBirth: props.currentPatientProfile?.dateOfBirth,
                sex: props.currentPatientProfile?.sex,
                provinceId: props.currentPatientProfile?.provinceId,
                districtId: props.currentPatientProfile?.districtId,
                wardId: props.currentPatientProfile?.wardId,
                province: props.currentPatientProfile?.province,
                district: props.currentPatientProfile?.district,
                ward: props.currentPatientProfile?.ward,
                address: '',
                guardianName: '',
                guardianPhone: '',
                guardianRelation: '',
                roles: props.currentPatientProfile?.roles,
                deleteAt: props.currentPatientProfile?.deleteAt,
                createdDate: props.currentPatientProfile?.createdDate,
                lastModifiedDate: props.currentPatientProfile?.lastModifiedDate,
            })
            setErrorMessage({
                patientName: '',
                patientSex: '',
                patientDateBirth: '',
                patientPhoneNumber: '',
                patientIdentityNumber: '',
                patientAddress: {
                    province: '',
                    commune: '',
                    district: '',
                },
                guardianName: '',
                guardianPhone: '',
                guardianRelation: ''
            })
            
            // Promise.all([getProvinceOptions(), getDistrictOptions(Number(props.currentPatientProfile?.patientAddress.province.key)), getCommuneOptions(Number(props.currentPatientProfile?.patientAddress.district.key))]).then((res) => {
            //     if (res[0] && res[1] && res[2]) {
            //         setState({
            //             ...state,
            //             addressOptions: {
            //                 province: res[0],
            //                 district: res[1],
            //                 commune: res[2]
            //             },
            //             canEditCommune: props.profileAction === ProfileAction.Edit,
            //             canEditDistrict: props.profileAction === ProfileAction.Edit
            //         })
            //     }
            // }).finally(() => { setLoading(false) })
        }
    }, [props.openForm])
    // const getProvinceOptions = async () => {
    //     const response: IProvince[] = await fetch('https://provinces.open-api.vn/api/?depth=1', {
    //         method: "GET",
    //     }).then((res) => res.json());
    //     let provinceOptions: IDropdownOption[] = []
    //     !!response && response.forEach(item => {
    //         provinceOptions.push({
    //             key: item.code,
    //             text: item.name
    //         })
    //     });
    //     provinceOptions.sort((a, b) => a.text.replace("Tỉnh", "").replace("Thành phố", "").localeCompare(b.text.replace("Tỉnh", "").replace("Thành phố", "")))
    //     return provinceOptions
    // }

    // const getDistrictOptions = async (provinceCode: number) => {
    //     const response: IProvince = !!provinceCode && await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}/?depth=2`, { method: "GET", }).then((res) => res.json());

    //     let districtOptions: IDropdownOption[] = []
    //     !!response && response.districts.forEach(item => {
    //         districtOptions.push({
    //             key: item.code,
    //             text: item.name
    //         })
    //     });
    //     return districtOptions.sort((a, b) => a.text.replace("Huyện", "").localeCompare(b.text.replace("Huyện", "")))
    // }

    // const getCommuneOptions = async (districtCode: number) => {
    //     const response: IDistrict = !!districtCode && await fetch(`https://provinces.open-api.vn/api/d/${districtCode}/?depth=2`, { method: "GET", }).then((res) => res.json());
    //     let communeOptions: IDropdownOption[] = []
    //     !!response && response.wards.forEach(item => {
    //         communeOptions.push({
    //             key: item.code,
    //             text: item.name
    //         })
    //     });
    //     return communeOptions.sort((a, b) => a.text.replace("Xã", "").localeCompare(b.text.replace("Xã", "")))
    // }
    
    const {  canEditCommune, canEditDistrict, loadingButton } = state
    const { province, district, commune } = state.addressOptions

    const onChangeOneFieldForm = (key: keyof IUserInfoViewModel, value: any) => {
        setCurrentPatient({
            ...currentPatientProfile,
            [key]: value
        })
        setErrorMessage({
            ...errorMessageFormString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IUserInfoViewModel, value: any) => {
        switch (key) {
            case UserInfoModelProperty.fullName:
                return validateRequireLimitCharacter(value)
            case UserInfoModelProperty.phoneNumber:
            case UserInfoModelProperty.guardianPhone: 
                return validateNumberField(value, 10)
            case UserInfoModelProperty.cmnd:
                return validateNumberField(value, 12)
            case UserInfoModelProperty.guardianName:
            case UserInfoModelProperty.guardianRelation: 
                return validateRequireLimitCharacterForm(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(currentPatientProfile.fullName)

        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(errorMessageFormString.patientPhoneNumber) && isStringEmpty(errorMessageFormString.patientIdentityNumber) && isStringEmpty(errorMessageFormString.guardianName) && isStringEmpty(errorMessageFormString.guardianPhone) && isStringEmpty(errorMessageFormString.guardianRelation)
        
        setErrorMessage({
            ...errorMessageFormString,
            patientName: tempNameError,

        })
        return passedVerify
    }

    // const setDistrictOptionAfterSelectProvince = () => {
        
    //     setCurrentPatient({
    //         ...currentPatientProfile,
    //         patientAddress: {
    //             ...currentPatientProfile.patientAddress,
    //             district: { key: 0, text: '' },
    //             commune: { key: 0, text: '' }
    //         }
    //     })
    //     setState({
    //         ...state,
    //         addressOptions: {
    //             province: state.addressOptions.province,
    //             district: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }],
    //             commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
    //         },
    //         canEditDistrict: true,
    //         canEditCommune: false
    //     })
    //     // getDistrictOptions(Number(currentPatientProfile.patientAddress.province.key)).then((res) => {
    //     //     setCurrentPatient({
    //     //         ...currentPatientProfile,
    //     //         patientAddress: {
    //     //             ...currentPatientProfile.patientAddress,
    //     //             district: { key: 0, text: '' },
    //     //             commune: { key: 0, text: '' }
    //     //         }
    //     //     })
    //     //     setState({
    //     //         ...state,
    //     //         addressOptions: {
    //     //             ...state.addressOptions,
    //     //             district: res,
    //     //             commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
    //     //         },
    //     //         canEditDistrict: true,
    //     //         canEditCommune: false
    //     //     })
    //     // })
    // }

    // const setCommuneOptionAfterSelectDistrict = () => {
    //     if (!!currentPatientProfile.patientAddress.district.key) {
    //         setCurrentPatient({
    //             ...currentPatientProfile,
    //             patientAddress: {
    //                 ...currentPatientProfile.patientAddress,
    //                 commune: { key: 0, text: '' }
    //             }
    //         })
    //         setState({
    //             ...state,
    //             addressOptions: {
    //                 ...state.addressOptions,
    //                 district: state.addressOptions.district,
    //                 commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
    //             },
    //             canEditCommune: true
    //         })

    //         // getCommuneOptions(Number(currentPatientProfile.patientAddress.district.key)).then((res) => {
    //         //     setState({
    //         //         ...state,
    //         //         addressOptions: {
    //         //             ...state.addressOptions,
    //         //             commune: res,
    //         //         },
    //         //         canEditCommune: true
    //         //     })
    //         // })
    //     } else {
    //         setCurrentPatient({
    //             ...currentPatientProfile,
    //             patientAddress: {
    //                 ...currentPatientProfile.patientAddress,
    //                 commune: { key: 0, text: '' }
    //             }
    //         })
    //         setState({
    //             ...state,
    //             addressOptions: {
    //                 ...state.addressOptions,
    //                 commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
    //             },
    //             canEditCommune: false
    //         })
    //     }
    // }
    
    // useEffect(() => {
    //     if (props.profileAction === ProfileAction.Create) {
    //         setDistrictOptionAfterSelectProvince()
    //     }

    //     if (props.profileAction === ProfileAction.Edit) {
    //         if (props.currentPatientProfile.patientAddress.province.key !== currentPatientProfile.patientAddress.province.key) {
    //             setDistrictOptionAfterSelectProvince()
    //         }
    //     }
    // }, [currentPatientProfile.patientAddress.province])

    // useEffect(() => {
    //     if (props.profileAction === ProfileAction.Create) {
    //         setCommuneOptionAfterSelectDistrict()
    //     }

    //     if (props.profileAction === ProfileAction.Edit) {
    //         if (props.currentPatientProfile.patientAddress.district.key !== currentPatientProfile.patientAddress.district.key) {
    //             setCommuneOptionAfterSelectDistrict()
    //         }
    //     }
    // }, [currentPatientProfile.patientAddress.district])

    // const onChangeAddress = (key: keyof IUserAddress, value: any) => {
    //     setCurrentPatient({
    //         ...currentPatientProfile,
    //         patientAddress: {
    //             ...currentPatientProfile.patientAddress,
    //             [key]: value
    //         },
    //     })
    //     setErrorMessage({
    //         ...errorMessageFormString,
    //         patientAddress: {
    //             ...errorMessageFormString.patientAddress,
    //             [key]: isStringEmpty(value?.text)
    //         }
    //     })
    // }

    const renderBodyForm = (): JSX.Element => {
        return (
            (false ?
                <div className="user-main-container" style={{ display: 'flex', flexWrap: 'wrap' }} >
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                </div > :
                <div className="patient-profile-form">
                    <div className="patient-profile-field">
                        <TextField
                            label='Họ và tên'
                            placeholder='--'
                            required={true}
                            value={currentPatientProfile.fullName}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.fullName, value) }}
                            errorMessage={errorMessageFormString.patientName}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Dropdown
                            placeholder="Chọn một giá trị"
                            label="Giới tính"
                            options={UserSexView}
                            selectedKey={currentPatientProfile.sex}
                            required
                            onChange={(_, selected) => {
                                onChangeOneFieldForm(UserInfoModelProperty.sex, Number(selected?.key))
                            }}
                            errorMessage={errorMessageFormString.patientSex}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Ngày sinh'
                            isRequired={true}
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => { onChangeOneFieldForm(UserInfoModelProperty.dateOfBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={!!currentPatientProfile.dateOfBirth ? new Date(currentPatientProfile.dateOfBirth) : new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Tuổi'
                            required={true}
                            value={!!currentPatientProfile.dateOfBirth ? (new Date().getFullYear() - new Date(currentPatientProfile.dateOfBirth).getFullYear()).toString() : ''}
                            readOnly
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={currentPatientProfile.phoneNumber}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.phoneNumber, value) }}
                            errorMessage={errorMessageFormString.patientPhoneNumber}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='CMND/ CCCD'
                            placeholder='--'
                            value={currentPatientProfile.cmnd}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.cmnd, value) }}
                            errorMessage={errorMessageFormString.patientIdentityNumber}
                        />
                    </div>
                    <div className="patient-profile-field">
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
                    <div className="patient-profile-field">
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
                    <div className="patient-profile-field">
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
                    <div className="patient-profile-field">
                        <TextField
                            label='Địa chỉ'
                            placeholder='--'
                            value={currentPatientProfile.address}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.cmnd, value) }}
                        // errorMessage={errorMessageFormString.patientAddress.address}
                        />
                    </div>
                    <div className="" style={{ border: '1px solid #CCCCCC', width: '100%' }}></div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Người giám hộ'
                            placeholder='--'
                            value={currentPatientProfile.guardianName}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.guardianName, value) }}
                            errorMessage={errorMessageFormString.guardianName}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='SĐT người giám hộ'
                            placeholder='--'
                            value={currentPatientProfile.guardianPhone}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.guardianPhone, value) }}
                            errorMessage={errorMessageFormString.guardianPhone}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Mối quan hệ'
                            placeholder='--'
                            value={currentPatientProfile.guardianRelation}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.guardianRelation, value) }}
                            errorMessage={errorMessageFormString.guardianRelation}
                        />
                    </div>
                </div>
            ))
    }

    const handleCloseForm = () => {
        props.closeForm()
        // const edited = checkEdited()
        
        // if (edited) {
        //     setOpenDialog(true)
        // } else {
        //     setOpen(false)
        // }
        setState({
            ...state,
            addressOptions: {
                province: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }],
                district: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }],
                commune: [{ key: -1, text: 'Vui lòng đợi...', disabled: true }]
            },
            canEditDistrict: false,
            canEditCommune: false,
        })
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        const canUpdate = validateFunction()
        if (canUpdate) {
            let requestBody = {

            }
            const result = new Promise((resolve) => {
                setState({ ...state, loadingButton: true })
                setTimeout(() => {
                    setState({ ...state, loadingButton: false, showMessage: true })
                    showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                    resolve('success')
                }, 4000);
            }).then(() => {/*  */

            })

            return result
        }
        return new Promise((res) => { })
    }

    const handleBackDialog = () => {
        setOpenDialog(false)
    }
    const handleCloseDialog = () => {
        setOpen(false)
        setOpenDialog(false)
    }

    // const checkEdited = () => {
    //     return !(currentPatientProfile.guardianName === props.currentPatientProfile.guardianName && currentPatientProfile.guardianPhone === props.currentPatientProfile.guardianPhone && currentPatientProfile.guardianRelation === props.currentPatientProfile.guardianRelation && currentPatientProfile.patientName === props.currentPatientProfile.patientName && currentPatientProfile.patientSex === props.currentPatientProfile.patientSex && currentPatientProfile.patientDateBirth === props.currentPatientProfile.patientDateBirth && currentPatientProfile.patientPhoneNumber === props.currentPatientProfile.patientPhoneNumber && currentPatientProfile.patientIdentityNumber === props.currentPatientProfile.patientIdentityNumber && currentPatientProfile.patientAddress.address === props.currentPatientProfile.patientAddress.address && currentPatientProfile.patientAddress.province.key === props.currentPatientProfile.patientAddress.province.key && currentPatientProfile.patientAddress.district.key === props.currentPatientProfile.patientAddress.district.key && currentPatientProfile.patientAddress.commune.key === props.currentPatientProfile.patientAddress.commune.key)
    // }

    return (
        <>
            <DialogView
                title={props.profileAction === ProfileAction.Create ? 'Thêm hồ sơ bệnh nhân' : 'Chỉnh sửa hồ sơ bệnh nhân'}
                hidden={!isOpen}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={handleCloseForm}
                loading={loadingButton}
            />
            <DialogView
                title={'Xác nhận hủy'}
                hidden={!isOpenDialog}
                customContent={props.profileAction === ProfileAction.Create ? <span>Bạn có chắc chắn muốn <strong>Hủy bỏ</strong> thêm hồ sơ.<br />Nếu thực hiện thao tác này, các thông tin vừa nhập sẽ không được lưu lại ?</span> : <span>Bạn có chắc chắn muốn <strong>Hủy bỏ</strong> chỉnh sửa.<br />Nếu thực hiện thao tác này, các thông tin vừa nhập sẽ không được lưu lại ?</span>}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Hủy'}
                confirm={handleCloseDialog}
                closeButtonText='Trở lại'
                close={handleBackDialog}
                loading={loadingButton}
            />
        </>
  )
}

export default BookingForm