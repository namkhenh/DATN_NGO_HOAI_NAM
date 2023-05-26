import React, { useState } from 'react'
import './AppartmentDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { Dropdown } from '../../../common/dropdown/DropDown'
import { TextField } from '../../../common/textField/TextField'
import { AppointmentInfoModelProperty, IAppointmentInfo } from '../../../model/apimodel/appointmentInfo'
import { HourBooking } from '../../../model/enum/appointmentEnum'
import Avatar from '@mui/material/Avatar'
import flag from '../../../base/image/anh-la-co-viet-nam-dep-1.png'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Label } from '@fluentui/react'
import Button from '@mui/material/Button'
import { ButtonColorType, ButtonVariantType } from '../../../model/enum/buttonEnum'
import DialogView from '../../../common/dialog/Dialog'
import { useParams } from 'react-router-dom'

export enum IAppointmentAction {
    Create,
    Edit
}

interface IAppartmentDetailPageProps {
    actionType: string
}

function AppartmentDetailPage(props: IAppartmentDetailPageProps) {
    const appointmentId = useParams().id;
    
    const [isOpenAccpet, setOpen] = useState<boolean>(false)
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [appointmentInfo, setAppointment] = useState<IAppointmentInfo>({
        appointmentDate: new Date().toString(), 
        appointmentReason: '',
        appointmentTime: 0
    })
    const onChangeOneField = (key: keyof IAppointmentInfo, value: any) => {
        setAppointment({
            ...appointmentInfo,
            [key]: value
        })
    }
    const handleBackDialog = () => {
        setOpenDialog(false)
    }
    const handleCloseDialog = () => {
        setOpen(false)
        setOpenDialog(false)
    }
    return (
        <div className='appointmentdetail-page'>
            <div className='appointmentdetail-page-container'>
                {props.actionType === "edit" ?
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Danh sách bệnh nhân đặt khám', href: '/admin/quan-ly-dat-kham' },
                            { key: 2, text: 'Chi tiết hồ sơ đặt khám', href: '/admin/quan-ly-dat-kham/chi-tiet-dat-kham' },
                        ]}
                    /> :
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Đặt lịch trực tiếp', href: '/admin/them-moi-hen-kham' },
                        ]}
                    />
                }
                {props.actionType === "edit" ?
                    <div className="appointmentdetail-page-title">
                        Chi tiết lịch đặt khám
                    </div> :
                    <div className="appointmentdetail-page-title">
                        Thêm mới lịch đặt khám
                    </div>
                }

                <div className="appoitment-info">
                    <div className="appointment-sub-title">
                        Thông tin đặt khám
                        <div className="appointment-status">
                            Chờ duyệt
                        </div>
                    </div>
                    <div className="appointment-info-wrap">
                        <div className="appointment-info-item">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Ngày khám'
                                isRequired={true}
                                // strings={defaultDatePickerStrings}
                                onSelectDate={(date) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentDate, `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`)
                                }}
                                value={new Date(appointmentInfo.appointmentDate)}
                                // parseDateFromString={()}'
                                minDate={new Date()}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <Dropdown
                                placeholder="Chọn một giá trị"
                                label="Khung giờ khám"
                                options={HourBooking}
                                selectedKey={appointmentInfo.appointmentTime}
                                required
                                onChange={(_, selected) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentTime, Number(selected?.key))
                                }}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Lý do/ Triệu chứng'
                                required
                                placeholder='--'
                                value={appointmentInfo.appointmentReason}
                                onChange={(_, value) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
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
                                // value={userMainInfo.userIdentityNumber}
                                // onChange={(_, value) => {
                                //     onChangeOneField(UserInfoModelProperty.userIdentityNumber, value)
                                // }}
                                // errorMessage={errorMessageString.userIdentityNumber}
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Số điện thoại'
                                    placeholder='--'
                                    value={"userMainInfo.userPhoneNumber"}
                                    onChange={(_, value) => {
                                        // onChangeOneField(UserInfoModelProperty.userPhoneNumber, value)
                                    }}
                                // errorMessage={errorMessageString.userPhoneNumber}
                                />
                            </div>
                            <div className="patient-info-detail width100">
                                <TextField
                                    label='Họ và tên'
                                    required
                                    placeholder='--'
                                    value={"userMainInfo.userPhoneNumber"}
                                    onChange={(_, value) => {
                                        // onChangeOneField(UserInfoModelProperty.userPhoneNumber, value)
                                    }}
                                // errorMessage={errorMessageString.userPhoneNumber}
                                />
                            </div>
                        </div>
                        <div className="patient-info-item-child">
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='CMND/ CCCD'
                                    placeholder='--'
                                // value={userMainInfo.userIdentityNumber}
                                // onChange={(_, value) => {
                                //     onChangeOneField(UserInfoModelProperty.userIdentityNumber, value)
                                // }}
                                // errorMessage={errorMessageString.userIdentityNumber}
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Mã đặt lịch'
                                    placeholder='--'
                                    value={"userMainInfo.userPhoneNumber"}
                                    onChange={(_, value) => {
                                        // onChangeOneField(UserInfoModelProperty.userPhoneNumber, value)
                                    }}
                                // errorMessage={errorMessageString.userPhoneNumber}
                                />
                            </div>

                            <div className="patient-info-detail width49 detail-wrap">
                                <div className="detail-wrap-item">
                                    <DatePicker
                                        placeholder="Chọn một giá trị"
                                        ariaLabel="Chọn một giá trị"
                                        label='Ngày sinh'
                                        isRequired={true}
                                        // strings={defaultDatePickerStrings}
                                        onSelectDate={(date) => {
                                            // onChangeOneField(UserInfoModelProperty.userDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`)
                                        }}
                                        value={new Date()}
                                        // parseDateFromString={()}'
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div className="detail-wrap-item">
                                    <TextField
                                        label='Tuổi'
                                        placeholder='--'
                                        value={"userMainInfo.userPhoneNumber"}
                                        onChange={(_, value) => {
                                            // onChangeOneField(UserInfoModelProperty.userPhoneNumber, value)
                                        }}
                                    // errorMessage={errorMessageString.userPhoneNumber}
                                    />
                                </div>
                            </div>
                            <div className="patient-info-detail width49">
                                <Label required>Giới tính</Label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
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
                                value={"userMainInfo.userAddress.address"}
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
                                value={appointmentInfo.appointmentReason}
                                onChange={(_, value) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                                }}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='SĐT người dám hộ'
                                placeholder='--'
                                value={appointmentInfo.appointmentReason}
                                onChange={(_, value) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                                }}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Mối quan hệ'
                                placeholder='--'
                                value={appointmentInfo.appointmentReason}
                                onChange={(_, value) => {
                                    onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {props.actionType === "edit" ?
                    <div className="appointment-info-button">
                        <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Trở lại</Button>
                        {true && <Button variant={ButtonVariantType.Contained}>Cập nhật</Button>}
                    </div> :
                    <div className="appointment-info-button">
                        <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                        <Button variant={ButtonVariantType.Contained}>Lưu</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default AppartmentDetailPage