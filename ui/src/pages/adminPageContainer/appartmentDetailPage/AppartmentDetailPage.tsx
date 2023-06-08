import React, { useState } from 'react'
import './AppartmentDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { Dropdown } from '../../../common/dropdown/DropDown'
import { TextField } from '../../../common/textField/TextField'
import { IAppointmenViewModel, IAppointmentInfo, IPatientProfileViewModel, AppointmenModelProperty } from '../../../model/apimodel/appointmentInfo'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Label } from '@fluentui/react'
import Button from '@mui/material/Button'
import { ButtonColorType, ButtonVariantType } from '../../../model/enum/buttonEnum'
import { useParams } from 'react-router-dom'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import { actionType } from '../../../context/Reducer'
import { UserGender } from '../../../model/enum/tableTypeEnum'
import { isStringEmpty, validateNumberField, validateRequireLimitCharacter, validateRequireLimitCharacterForm } from '../../../utils/commonFunction'
import { PatientReceptionService } from '../../../api/patientReception/patientReception'

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
    // const appointmentId = useParams().id;

    // const [isOpenAccpet, setOpen] = useState<boolean>(false)
    // const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    // const [loadingButton, setLoading] = useState<boolean>(false)
    const [emergencyStatus, setEmergency] = useState<string>(PatientType.Normal.toString())
    const [profileDate, setProfileDate] = useState<Date>(new Date())
    const [profileTime, setProfileTime] = useState<string>()
    const [profileReason, setProfileReason] = useState<string>()
    const [patientIdentityNumber, setPatientIdentityNumber] = useState<string>()
    const [patientPhoneNumber, setPatientPhoneNumber] = useState<string>()
    const [patientCode, setPatientCode] = useState<string>()
    const [appointmentCode, setAppointmentCode] = useState<string>()
    const [patientName, setPatientName] = useState<string>()
    const [patientDateOfBirth, setPatientDateOfBirth] = useState<Date>()
    const [patientGender, setPatientGender] = useState<string>(UserGender.Male.toString())
    const [patientAddress, setPatientAddress] = useState<string>()
    const [guardianName, setGuardianName] = useState<string>()
    const [guardianPhone, setGuardianPhone] = useState<string>()
    const [guardianRelation, setGuardianRelation] = useState<string>()
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

    const validate = (key: keyof IAppointmenViewModel, value: any) => {
        setErrorMessage({
            ...errorMessageFormString,
            [key]: validateField(key, value)
        })
    }

    const getStaticTableData = () => {
        return PatientReceptionService.getPatientReceptionStaticReport()
    }

    console.log(getStaticTableData());
    

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
        let tempNameError = validateRequireLimitCharacter(patientName)
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

    return (
        <div className='appointmentdetail-page'>
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
                                label='Ngày đăng kí'
                                isRequired={true}
                                // strings={defaultDatePickerStrings}
                                onSelectDate={(date) => {
                                    setProfileDate(date as Date)
                                }}
                                disabled
                                value={profileDate}
                            // parseDateFromString={()}'
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Giờ đăng kí'
                                required
                                placeholder='--'
                                value={`${new Date().getHours().toString()}` + ':' + `${new Date().getMinutes().toString()}`}
                                disabled
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Lý do/ Triệu chứng'
                                required
                                placeholder='--'
                                value={profileReason}
                                onChange={(_, value) => {
                                    setProfileReason(value as string)
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
                                    value={patientIdentityNumber}
                                    onChange={(_, value) => {
                                        setPatientIdentityNumber(value)
                                        validate(AppointmenModelProperty.patientIdentityNumber, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientIdentityNumber}
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Số điện thoại'
                                    placeholder='--'
                                    value={patientPhoneNumber}
                                    onChange={(_, value) => {
                                        setPatientPhoneNumber(value)
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
                                    value={patientName}
                                    onChange={(_, value) => {
                                        setPatientName(value)
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
                                    value={patientCode}
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
                                            setPatientDateOfBirth(date as Date)
                                        }}
                                        value={patientDateOfBirth}
                                        // parseDateFromString={()}'
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div className="detail-wrap-item">
                                    <TextField
                                        label='Tuổi'
                                        placeholder='--'
                                        value={!!patientDateOfBirth ? (new Date().getFullYear() - patientDateOfBirth?.getFullYear()).toString() : ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="patient-info-detail width49">
                                <Label required>Giới tính</Label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={patientGender}
                                    onChange={(_, value) => setPatientGender(value)}
                                >
                                    <FormControlLabel value={UserGender.Male} control={<Radio />} label="Nam" />
                                    <FormControlLabel value={UserGender.Female} control={<Radio />} label="Nữ" />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width25">
                            <Dropdown
                                placeholder="--"
                                label="Tỉnh/ Thành phố"
                                options={[]}
                                required
                            // selectedKey={userAddress.province?.key}
                            // required
                            // onChange={(_, selected) => {
                            //     onChangeAddress(UserAddressModelProperty.province, selected)
                            // }}
                            // errorMessage={errorMessageString.userAddress.province}
                            // onFocus={this.getProvinceOptions.bind(this)}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Dropdown
                                placeholder="--"
                                label="Huyện/ Quận"
                                options={[]}
                                required
                            // selectedKey={userAddress.district?.key}
                            // required
                            // onChange={(_, selected) => {
                            //     onChangeAddress(UserAddressModelProperty.district, selected)
                            // }}
                            // errorMessage={errorMessageString.userAddress.district}
                            // // onFocus={() => { this.getDistrictOptions.bind(this)(Number(userAddress.province?.key)) }}
                            // disabled={!canEditDistrict}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Dropdown
                                placeholder="--"
                                label="Xã/ Phường"
                                options={[]}
                                required
                            // selectedKey={userAddress.commune?.key}
                            // required
                            // onChange={(_, selected) => {
                            //     onChangeAddress(UserAddressModelProperty.commune, selected)
                            // }}
                            // errorMessage={errorMessageString.userAddress.commune}
                            // // onFocus={this.getCommuneOptions.bind(this)(Number(this.state.userMainInfo?.userAddress.province.key))}
                            // disabled={!canEditCommune}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <TextField
                                label='Số nhà/ Thôn/ Xóm'
                                placeholder='--'
                                value={"userMainInfo.userAddress.address"}
                            // onChange={(_, selected) => {
                            //     onChangeAddress(UserAddressModelProperty.address, selected)
                            // }}
                            // errorMessage={errorMessageString.userAddress.address}
                            />
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width100">
                            <TextField
                                label='Địa chỉ'
                                placeholder='--'
                                required
                                value={patientAddress}
                                disabled
                            // onChange={(_, selected) => {
                            //     onChangeAddress(UserAddressModelProperty.address, selected)
                            // }}
                            // errorMessage={errorMessageString.userAddress.address}
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
                                value={guardianName}
                                onChange={(_, value) => {
                                    setGuardianName(value)
                                    validate(AppointmenModelProperty.guardianName, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianName}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='SĐT người dám hộ'
                                placeholder='--'
                                value={guardianPhone}
                                onChange={(_, value) => {
                                    setGuardianPhone(value)
                                    validate(AppointmenModelProperty.guardianPhone, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianPhone}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Mối quan hệ'
                                placeholder='--'
                                value={guardianRelation}
                                onChange={(_, value) => {
                                    setGuardianRelation(value)
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