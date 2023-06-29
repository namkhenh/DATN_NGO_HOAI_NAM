import React, { useEffect, useState } from 'react'
import './AppartmentDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { TextField } from '../../../common/textField/TextField'
import { IAppointmenViewModel, AppointmenModelProperty } from '../../../model/apimodel/appointmentInfo'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Label } from '@fluentui/react'
import Button from '@mui/material/Button'
import { ButtonColorType, ButtonVariantType } from '../../../model/enum/buttonEnum'
import { useParams } from 'react-router-dom'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import { UserGender } from '../../../model/enum/tableTypeEnum'
import { isStringEmpty, validateNumberField, validateRequireLimitCharacter, validateRequireLimitCharacterForm } from '../../../utils/commonFunction'
import { Autocomplete, Backdrop, CircularProgress, TextField as TextFieldView } from '@mui/material'
import { TimePickerView } from '../../../common/timePicker/TimePicker'
import { CommuneDefault, DistricDefault, ICommune, IDistrict, IProvince, IUserAddress, IUserInfoViewModel, ProvinceDefault, UserInfoDefaultView, UserInfoModelProperty } from '../../../model/apimodel/userInfo'
import { AddressService, UserService } from '../../../api/apiPage/apiPage'
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'

export enum IAppointmentAction {
    Create,
    Edit
}

export enum PatientType {
    Normal,
    Emergency
}

interface IAppartmentDetailPageProps {
    actionType: IAppointmentAction
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

function AppartmentDetailPage(props: IAppartmentDetailPageProps) {
    const appointmentIdFromProps = useParams().id;

    // const [isOpenAccpet, setOpen] = useState<boolean>(false)
    // const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    // const [loadingButton, setLoading] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [emergencyStatus, setEmergency] = useState<string>(PatientType.Normal.toString())
    const [appointmentId, setappointmentId] = useState<string>(appointmentIdFromProps || '')
    const [appointmentCode, setappointmentCode] = useState<string>()
    const [appointmentDate, setappointmentDate] = useState<Date>(new Date())
    const [appointmentTime, setappointmentTime] = useState<Date>(new Date())
    const [appointmentReason, setappointmentReason] = useState<string>()
    const [userInfo, setUserInfo] = useState<IUserInfoViewModel>(UserInfoDefaultView)
    const [listProvince, setListProvince] = useState<IProvince[]>()
    const [listDistrict, setListDistrict] = useState<IDistrict[]>()
    const [listWard, setListWard] = useState<ICommune[]>()
    const [provinceSelect, setProvinceSelect] = useState<IProvince>(ProvinceDefault)
    const [districtSelect, setDistrictSelect] = useState<IDistrict>(DistricDefault)
    const [wardSelect, setWardSelect] = useState<ICommune>(CommuneDefault)
    const [loadingDistrict, setloadingDis] = useState<boolean>(false)
    const [loadingCommune, setloadingCom] = useState<boolean>(false)
    const [{ auth }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
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

    const onChangeOneField = (key: keyof IUserInfoViewModel, value: any) => {
        setUserInfo({
            ...userInfo,
            [key]: value
        })
    }

    const validate = (key: keyof IAppointmenViewModel, value: any) => {
        setErrorMessage({
            ...errorMessageFormString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IAppointmenViewModel, value: any) => {
        switch (key) {
            case AppointmenModelProperty.patientName:
                return validateRequireLimitCharacter(value)
            case AppointmenModelProperty.patientPhoneNumber:
            case AppointmenModelProperty.guardianPhone:
                return validateNumberField(value, 10)
            case AppointmenModelProperty.patientIdentityNumber:
                return validateNumberField(value, 12)
            case AppointmenModelProperty.guardianName:
            case AppointmenModelProperty.guardianRelation:
                return validateRequireLimitCharacterForm(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(userInfo.fullName)
        // let tempProvinceError = validateRequire(patientAddress.province.text)
        // let tempDistrictError = validateRequire(patientAddress.district.text)
        // let tempCommuneError = validateRequire(patientAddress.commune.text)

        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(errorMessageFormString.patientPhoneNumber) && isStringEmpty(errorMessageFormString.patientIdentityNumber) && isStringEmpty(errorMessageFormString.guardianName) && isStringEmpty(errorMessageFormString.guardianPhone) && isStringEmpty(errorMessageFormString.guardianRelation)

        setErrorMessage({
            ...errorMessageFormString,
            patientName: tempNameError,
            // patientAddress: {
            //     province: tempProvinceError,
            //     district: tempDistrictError,
            //     commune: tempCommuneError,
            // }    
        })
        return passedVerify
    }

    useEffect(() => {
        if (!!auth.userId) {
            setLoading(true)
            UserService.getUserById(auth.userId).then(res => {
                if (res.success) {
                    setLoading(false)
                    setUserInfo({
                        id: auth.userId,
                        code: res.data?.code,
                        userName: res.data?.userName,
                        status: res.data?.status,
                        phoneNumber: res.data?.phoneNumber,
                        fullName: res.data?.fullName,
                        email: res.data?.email,
                        cmnd: res.data?.cmnd,
                        dateOfBirth: res.data?.dateOfBird,
                        sex: res.data?.sex,
                        provinceId: res.data?.provinceId,
                        districtId: res.data?.districtId,
                        wardId: res.data?.wardId,
                        province: res.data?.province,
                        district: res.data?.district,
                        ward: res.data?.ward,
                        address: res.data?.adress,
                        religion: res.data?.religion,
                        guardianName: res.data?.guardiasName,
                        guardianPhone: res.data?.guardiansPhoneNumber,
                        guardianRelation: res.data?.relationship,
                        roles: res.data?.roles,
                    })
                    setappointmentDate(new Date())
                    setappointmentTime(new Date())
                } else {
                    setLoading(false)
                    showMessageBar(`Đã có lỗi xảy ra! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                }
            })
        }
    }, [])

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
        if (!!provinceSelect?.code) {
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
            setListDistrict([])
            setListWard([])
        }

    }, [provinceSelect])

    useEffect(() => {
        if (!!districtSelect?.code) {
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

    const convertAddressToString = (inputAddress: IUserAddress) => {
        const addressString = inputAddress.address ? inputAddress.address + ', ' : ""
        const outputAddress: string = addressString + (!!inputAddress.commune?.name ? inputAddress.commune?.name : '') + ', ' + (!!inputAddress.district?.name ? inputAddress.district?.name : '') + ', ' + (!!inputAddress.province?.name ? inputAddress.province?.name : '')
        return outputAddress
    }

    console.log(appointmentTime);
    console.log(appointmentDate);
    

    return (
        <div className='appointmentdetail-page'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='appointmentdetail-page-container'>
                {props.actionType === IAppointmentAction.Edit ?
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Tiếp đón bệnh nhân đặt khám', href: '/admin/tiep-don-dat-kham' },
                            { key: 2, text: 'Chi tiết', href: '/admin/chi-tiet-ho-so' },
                        ]}
                    /> :
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Tiếp đón bệnh nhân', href: '/admin/danh-sach-benh-nhan' },
                            { key: 2, text: 'Thêm mới', href: '/admin/them-moi-hen-kham' },
                        ]}
                    />
                }
                {props.actionType === IAppointmentAction.Edit ?
                    <div className="appointmentdetail-page-title">
                        Chi tiết hồ sơ bệnh nhân
                    </div> :
                    <div className="appointmentdetail-page-title">
                        Thêm mới hồ sơ bệnh nhân
                    </div>
                }
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                        onSearch={() => { }}
                    />
                </div>
                <div className="appoitment-info">
                    <div className="appointment-sub-title">
                        Thông tin hồ sơ
                    </div>
                    <div className="appointment-info-wrap">
                        <div className="appointment-info-item">
                            <Label required>Phân loại bệnh nhân</Label>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={emergencyStatus}
                                onChange={(_, value) => props.actionType === IAppointmentAction.Create && setEmergency(value)}
                            >
                                <FormControlLabel value={PatientType.Normal} control={<Radio />} label="BN thường" />
                                <FormControlLabel value={PatientType.Emergency} control={<Radio />} label="BN cấp cứu" />
                            </RadioGroup>
                        </div>
                        <div className="appointment-info-item">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Ngày khám'
                                isRequired={true}
                                // strings={defaultDatePickerStrings}
                                onSelectDate={(date) => {
                                    setappointmentDate(date as Date)
                                }}
                                value={appointmentDate}
                            // parseDateFromString={()}'
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TimePickerView
                                placeholder='Chọn một giá trị'
                                label='Khung giờ khám'
                                timeRange={{ start: 8, end: 17 }}
                                dateAnchor={appointmentDate}
                                increments={15}
                                onChange={(_, time) => setappointmentTime(time)}
                                value={appointmentTime}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Lý do/ Triệu chứng'
                                required
                                placeholder='--'
                                value={appointmentReason}
                                onChange={(_, value) => {
                                    setappointmentReason(value as string)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="patient-info">
                    <div className="appointment-sub-title">
                        Thông tin bệnh nhân
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-avt">
                            {/* <Avatar variant="rounded" alt={''} src={flag}
                                sx={{ width: '132px', height: '132px' }}
                            /> */}
                            <ImageNotSupportedOutlinedIcon />
                        </div>
                        <div className="patient-info-item-child">
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='CMND/ CCCD'
                                    placeholder='--'
                                    value={userInfo.cmnd}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.cmnd, value)
                                        validate(AppointmenModelProperty.patientIdentityNumber, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientIdentityNumber}
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Số điện thoại'
                                    placeholder='--'
                                    value={userInfo.phoneNumber}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.phoneNumber, value)
                                        validate(AppointmenModelProperty.patientPhoneNumber, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientPhoneNumber}
                                />
                            </div>
                            <div className="patient-info-detail width100">
                                <TextField
                                    label='Họ và tên'
                                    required
                                    placeholder='--'
                                    value={userInfo.fullName}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.fullName, value)
                                        validate(AppointmenModelProperty.patientName, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientName}
                                />
                            </div>
                        </div>
                        <div className="patient-info-item-child">
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Mã bệnh nhân'
                                    placeholder='--'
                                    value={userInfo.code}
                                    disabled
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Mã đặt lịch'
                                    placeholder='--'
                                    value={appointmentCode}
                                    disabled
                                />
                            </div>

                            <div className="patient-info-detail width49 detail-wrap">
                                <div className="detail-wrap-item">
                                    <DatePicker
                                        placeholder="Chọn một giá trị"
                                        ariaLabel="Chọn một giá trị"
                                        label='Ngày sinh'
                                        isRequired={false}
                                        // strings={defaultDatePickerStrings}
                                        onSelectDate={(date) => {
                                            onChangeOneField(UserInfoModelProperty.dateOfBirth, date)
                                        }}
                                        value={!!userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth) : new Date()}
                                        // parseDateFromString={()}'
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div className="detail-wrap-item">
                                    <TextField
                                        label='Tuổi'
                                        placeholder='--'
                                        value={!!userInfo.dateOfBirth ? (new Date().getFullYear() - new Date(userInfo.dateOfBirth).getFullYear()).toString() : ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="patient-info-detail width49">
                                <Label required>Giới tính</Label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={userInfo.sex}
                                    onChange={(_, value) => onChangeOneField(UserInfoModelProperty.sex, Number(value))}
                                >
                                    <FormControlLabel value={UserGender.Male} control={<Radio />} label="Nam" />
                                    <FormControlLabel value={UserGender.Female} control={<Radio />} label="Nữ" />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width25">
                            <Label required>Tỉnh/ Thành phố</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listProvince ? listProvince : []}
                                value={!!provinceSelect?.code ? provinceSelect : ProvinceDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn tỉnh' />}
                                onChange={(_, selected) => {
                                    setProvinceSelect(selected!)
                                    setDistrictSelect(DistricDefault)
                                }}
                                loading={listProvince?.length === 0}
                                loadingText={<>Vui lòng đợi...</>}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Label required>Huyện/ Quận</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listDistrict ? listDistrict : []}
                                value={!!districtSelect?.code ? districtSelect : DistricDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn huyện' />}
                                onChange={(_, selected) => {
                                    setDistrictSelect(selected!)
                                    setWardSelect(CommuneDefault)
                                }}
                                loading={loadingDistrict}
                                loadingText={<>Vui lòng đợi...</>}
                                disabled={!provinceSelect?.id}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Label required>Xã/ Phường</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listWard ? listWard : []}
                                value={!!wardSelect?.code ? wardSelect : CommuneDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn xã' />}
                                onChange={(_, selected) => {
                                    setWardSelect(selected!)
                                }}
                                loading={loadingCommune}
                                loadingText={<>Vui lòng đợi...</>}
                                disabled={!districtSelect?.id}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <TextField
                                label='Số nhà/ Thôn/ Xóm'
                                placeholder='--'
                                value={userInfo.address}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.address, value)
                                }}
                            // errorMessage={state.errorMessageString.userAddress.address}
                            />
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width100">
                            <TextField
                                label='Địa chỉ'
                                placeholder='--'
                                required
                                value={
                                    convertAddressToString(
                                        {
                                            province: provinceSelect,
                                            district: districtSelect,
                                            commune: wardSelect,
                                            address: userInfo.address
                                        })}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="appoitment-info">
                    <div className="appointment-sub-title">
                        Thông tin bổ sung
                    </div>
                    <div className="appointment-info-wrap">
                        <div className="appointment-info-item">
                            <TextField
                                label='Người giám hộ'
                                placeholder='--'
                                value={userInfo.guardianName}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.guardianName, value)
                                    validate(AppointmenModelProperty.guardianName, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianName}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='SĐT người dám hộ'
                                placeholder='--'
                                value={userInfo.guardianPhone}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.guardianPhone, value)
                                    validate(AppointmenModelProperty.guardianPhone, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianPhone}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Mối quan hệ'
                                placeholder='--'
                                value={userInfo.guardianRelation}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.guardianRelation, value)
                                    validate(AppointmenModelProperty.guardianRelation, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianRelation}
                            />
                        </div>
                    </div>
                </div>
                <div className="appointment-info-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <Button variant={ButtonVariantType.Contained} onClick={validateFunction}>Lưu</Button>}
                </div>
            </div>
        </div>
    )
}

export default AppartmentDetailPage