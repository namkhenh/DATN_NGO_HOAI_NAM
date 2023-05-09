import React, {useEffect, useState} from 'react';
import HeaderPage from '../../structure/headerPage/HeaderPage';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './BookingAppointment.scss'
import Button from '@mui/material/Button';
import {ButtonColorType, ButtonVariantType} from '../../model/enum/buttonEnum';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BookingPatientItem from '../../components/bookingPatientItem/BookingPatientItem';
import {
    AppointmentInfoModelProperty,
    IAppointmentInfo,
    IPatientProfileViewModel,
    PatientProfileDefaultView
} from '../../model/apimodel/appointmentInfo';
import AddIcon from '@mui/icons-material/Add';
import {DatePicker} from '../../common/datePicker/DatePicker';
import {Dropdown} from '../../common/dropdown/DropDown';
import {TextField} from '../../common/textField/TextField';
import {HourBooking, ProfileAction} from '../../model/enum/appointmentEnum';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DialogView from '../../common/dialog/Dialog';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import BookingForm from '../../components/bookingForm/BookingForm';
import {MessageBarStatus} from '../../model/enum/messageBarEnum';
import {useStateValue} from '../../context/StateProvider';
import {actionType} from '../../context/Reducer';
import {isStringEmpty, validateRequire} from '../../utils/commonFunction';
import AcceptBookingForm from '../../components/acceptBookingForm/AcceptBookingForm';

interface BookingAppointmentState {
    patientProfile: IPatientProfileViewModel[]
    currentPatientProfile: IPatientProfileViewModel
    userProfile: IPatientProfileViewModel
    currentSelection: number
    addressOptions: IAddressOptions
    canEditDistrict: boolean
    canEditCommune: boolean
    loadingButton: boolean
    showMessage: boolean
    profileAction?: ProfileAction
}

interface IAddressOptions {
    province: IDropdownOption[]
    district: IDropdownOption[]
    commune: IDropdownOption[]
}

interface IBookingInfoErrorMessage {
    appointmentDate: string;
    appointmentTime: string;
    appointmentReason: string
}

interface IAddressErrorMessage {
    province: string
    district: string
    commune: string
}

interface IUserMainInfoErrorMessage {
    patientName: string;
    patientSex: string;
    patientDateBirth: string;
    patientPhoneNumber: string;
    patientIdentityNumber: string;
    patientAddress: IAddressErrorMessage
}

const BookingAppointment = (props: any) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openAccept, setOpenAccept] = useState<boolean>(false)
    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [appointmentInfo, setAppointment] = useState<IAppointmentInfo>({
        appointmentDate: new Date().toString(),
        appointmentReason: '',
        appointmentTime: 0
    })
    const [errorMessageString, setErrorMessage] = useState<IBookingInfoErrorMessage>({
        appointmentDate: "",
        appointmentTime: "",
        appointmentReason: ""
    })
    const [state, setState] = useState<BookingAppointmentState>({
        userProfile: {
            patientId: "BN123456",
            patientName: "nguyễn văn 1",
            patientDateBirth: "05/18/2001",
            patientSex: 0,
            patientAddress: {
                province: {
                    key: 1,
                    text: 'Thành phố Hà Nội'
                },
                district: {
                    key: 1,
                    text: 'Quận Ba Đình'
                },
                commune: {
                    key: 4,
                    text: 'Phường Trúc Bạch'
                },
                address: ''
            },
            patientPhoneNumber: '0123456789'
        },
        currentPatientProfile: PatientProfileDefaultView,
        patientProfile: [{
            patientId: "BN123456",
            patientName: "nguyễn văn 2",
            patientDateBirth: "05/18/2001",
            patientSex: 0,
            patientAddress: {
                province: {
                    key: 1,
                    text: 'Thành phố Hà Nội'
                },
                district: {
                    key: 1,
                    text: 'Quận Ba Đình'
                },
                commune: {
                    key: 4,
                    text: 'Phường Trúc Bạch'
                },
                address: ''
            },
            patientPhoneNumber: '0123456789'
        },
            {
                patientId: "BN123456",
                patientName: "nguyễn văn 3",
                patientDateBirth: "05/18/2001",
                patientSex: 0,
                patientAddress: {
                    province: {
                        key: 1,
                        text: 'Thành phố Hà Nội'
                    },
                    district: {
                        key: 1,
                        text: 'Quận Ba Đình'
                    },
                    commune: {
                        key: 4,
                        text: 'Phường Trúc Bạch'
                    },
                    address: ''
                },
                patientPhoneNumber: ''
            }],
        currentSelection: 0,

        addressOptions: {
            province: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
            district: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
            commune: [{key: -1, text: 'Vui lòng đợi...', disabled: true}]
        },
        canEditDistrict: false,
        canEditCommune: false,
        loadingButton: false,
        showMessage: false
    })

    const {userProfile, patientProfile, currentSelection, currentPatientProfile, loadingButton} = state
    let allProfile = [userProfile].concat(patientProfile)

    const onChangeOneField = (key: keyof IAppointmentInfo, value: any) => {
        setAppointment({
            ...appointmentInfo,
            [key]: value
        })
        setErrorMessage({
            ...errorMessageString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IAppointmentInfo, value: any) => {
        switch (key) {
            case AppointmentInfoModelProperty.appointmentReason:
                return validateRequire(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempReasonError = validateRequire(appointmentInfo.appointmentReason)

        passedVerify = isStringEmpty(tempReasonError)
        setErrorMessage({
            ...errorMessageString,
            appointmentReason: tempReasonError
        })
        return passedVerify
    }

    const openConfirmAppointment = () => {
        const canConfirm = validateFunction()
        if (canConfirm) {
            setOpenAccept(true)
        }
    }

    const cancelBooking = () => {
        setAppointment({
            appointmentDate: new Date().toString(),
            appointmentReason: '',
            appointmentTime: 0
        })
    }

    const handleClickProfile = (index: number) => {
        setState({
            ...state,
            currentSelection: index,
        });
    }

    const handleActionPatientProfile = (action: string, index: number) => {
        if (action === "Add") {
            setState({
                ...state,
                currentPatientProfile: PatientProfileDefaultView,
                profileAction: ProfileAction.Create,
            })
            setOpenForm(true)
        }
        if (action === "Edit") {
            setState({
                ...state,
                currentPatientProfile: allProfile[index],
                profileAction: ProfileAction.Edit,
                canEditCommune: true,
                canEditDistrict: true,
                currentSelection: index,
            })
            setOpenForm(true)
        }
        if (action === "Delete") {
            setOpenDelete(true)
        }
    }

    const closeForm = () => {
        setOpenForm(false)
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }

    const handleDeleteProfile = () => {
        let requestBody = {}
        const result = new Promise((resolve) => {
            setState({...state, loadingButton: true})
            setTimeout(() => {
                setState({...state, loadingButton: false, showMessage: true})
                showMessageBar("Xóa hồ sơ người bệnh thành công", true, MessageBarStatus.Success)
                setOpenDelete(false)
            }, 4000);
        }).then(() => {/*  */

        })
        return result
    }

    const closeDelete = () => {
        setOpenDelete(false)
    }

    const closeAccept = () => {
        setOpenAccept(false)
    }

    const checkEdited = () => {
        const isEdited = !(`${new Date(appointmentInfo.appointmentDate).getDate()}/${new Date(appointmentInfo.appointmentDate).getMonth() + 1}/${new Date(appointmentInfo.appointmentDate).getFullYear()}` === `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` && appointmentInfo.appointmentTime === 0 && appointmentInfo.appointmentReason === '')
        setIsEdited(isEdited)
    }

    useEffect(() => {
        checkEdited()
    }, [appointmentInfo])

    return (
        <div id='booking-appointment' className='booking-appointment'>
            <HeaderPage icon={<EventAvailableIcon/>} text='Quản lý lịch khám' textChild='Đặt lịch khám'/>
            <div className="booking-appointment-container">
                <div className="booking-appointment">
                    <div className="booking-appointment-title">
                        Thông tin người bệnh
                    </div>
                    <div className="booking-appointment-sub-title">
                        Vui lòng chọn một trong các lịch khám có sẵn để xem chi tiết hoặc bấm vào <strong>Đặt khám
                        mới</strong> để tạo lịch khám mới
                    </div>
                    <div className="booking-appointment-wrap">
                        {/* <div className="no-booking-appointment">
                            <ReportProblemOutlinedIcon sx={{ fontSize: '96px', color: '#cccccc', marginBottom: '12px' }}></ReportProblemOutlinedIcon>
                            Không tìm thấy lịch hẹn nào
                        </div> */}
                        {allProfile?.map((item, index) => {
                            return <BookingPatientItem
                                index={index}
                                name={item.patientName}
                                dateBirth={item.patientDateBirth}
                                sex={item.patientSex}
                                phone={item.patientPhoneNumber}
                                selectProfile={handleClickProfile}
                                editProfile={handleActionPatientProfile}
                                isSelected={currentSelection === index}
                            />
                        })}
                    </div>
                    <div className="booking-new-booking-appointment">
                        {currentSelection !== 0 &&
                            <Button variant={ButtonVariantType.Outlined} startIcon={<DeleteOutlineOutlinedIcon/>}
                                    sx={{marginRight: '8px'}} color={ButtonColorType.Error} onClick={() => {
                                handleActionPatientProfile("Delete", 0)
                            }}>
                                Xóa người bệnh
                            </Button>}
                        <Button variant={ButtonVariantType.Outlined} startIcon={<AddIcon/>} onClick={() => {
                            handleActionPatientProfile("Add", 0)
                        }}>
                            Thêm hồ sơ
                        </Button>
                    </div>
                </div>
                <div className="booking-appointment-right">
                    <div className="booking-appointment-detail">
                        <div className="booking-appointment-title">
                            Thông tin đặt khám
                        </div>
                        <div className="booking-appointment-wrap">
                            <div className="booking-appointment-item">
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
                            <div className="booking-appointment-item">
                                <Dropdown
                                    placeholder="Chọn một giá trị"
                                    label="Khung giờ khám"
                                    options={HourBooking}
                                    selectedKey={appointmentInfo.appointmentTime}
                                    required
                                    onChange={(_, selected) => {
                                        onChangeOneField(AppointmentInfoModelProperty.appointmentTime, Number(selected?.key))
                                    }}
                                    errorMessage={errorMessageString.appointmentTime}
                                />
                            </div>
                            <div className="booking-appointment-item">
                                <TextField
                                    label='Lý do/ Triệu chứng'
                                    required
                                    placeholder='--'
                                    value={appointmentInfo.appointmentReason}
                                    onChange={(_, value) => {
                                        onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                                    }}
                                    errorMessage={errorMessageString.appointmentReason}
                                />
                            </div>
                            <div className="booking-button-wrap">
                                <Button variant={ButtonVariantType.Outlined} startIcon={<ClearOutlinedIcon/>}
                                        color={ButtonColorType.Inherit} disabled={!isEdited} onClick={cancelBooking}>
                                    Hủy bỏ
                                </Button>
                                <Button variant={ButtonVariantType.Contained} startIcon={<EventAvailableOutlinedIcon/>}
                                        onClick={openConfirmAppointment}>
                                    Đặt lịch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingForm
                openForm={openForm}
                closeForm={closeForm}
                currentPatientProfile={currentPatientProfile}
                profileAction={state.profileAction}
            />
            <DialogView
                title={'Xác nhận xóa'}
                hidden={!openDelete}
                customContent={
                    <span>Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân <strong>{currentSelection !== -1 ? allProfile[currentSelection].patientName : ''}</strong></span>}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Xóa'}
                confirmWithPromise={handleDeleteProfile}
                closeButtonText='Trở lại'
                close={closeDelete}
                loading={loadingButton}
            />
            <AcceptBookingForm
                closeAccept={closeAccept}
                currentBookingAppointment={{
                    appointmentDate: appointmentInfo.appointmentDate,
                    appointmentTime: appointmentInfo.appointmentTime,
                    appointmentReason: appointmentInfo.appointmentReason,
                    patientName: allProfile[currentSelection].patientName,
                    patientBirth: allProfile[currentSelection].patientDateBirth,
                    patientSex: allProfile[currentSelection].patientSex,
                    patientPhone: allProfile[currentSelection].patientPhoneNumber!,
                    patientAddress: allProfile[currentSelection].patientAddress,
                    patientId: allProfile[currentSelection].patientId
                }}
                openAccept={openAccept}
            />
        </div>
    );
}

export default BookingAppointment;