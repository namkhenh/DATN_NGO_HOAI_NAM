import React, {useEffect, useState} from 'react';
import HeaderPage from '../../../structure/headerPage/HeaderPage';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './ListAppointment.scss'
import Button from '@mui/material/Button';
import {ButtonVariantType} from '../../../model/enum/buttonEnum';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import AppointmentItem from '../../../components/appointmentItem/AppointmentItem';
import {AppointmentStatus} from '../../../model/enum/appointmentEnum';
import avatar1 from '../../../base/image/anh-la-co-viet-nam-dep-1.png'
import {IAppointmenViewModel} from '../../../model/apimodel/appointmentInfo';
import AppointmentDetail from '../../../components/appointmentDetail/AppointmentDetail';
import InfoIcon from '@mui/icons-material/Info';
import { CommuneDefault, DistricDefault, ProvinceDefault } from '../../../model/apimodel/userInfo';


interface ListAppointmentState {
    appointment: IAppointmenViewModel[]
    currentSelection: number
}

const ListAppointment = (props: any) => {
    const [state, setState] = useState<ListAppointmentState>({
        appointment: [{
            patientAvatar: avatar1,
            patientName: "nguyễn văn A",
            patientBirth: new Date(),
            patientSex: 0,
            patientPhoneNumber: "0123456789",
            patientAddress: {
                province: ProvinceDefault,
                district: DistricDefault,
                commune: CommuneDefault
            },
            appointmentDate: new Date(),
            appointmentTime: new Date(),
            appointmentReason: "đau đầu ù tai",
            appointmentStatus: AppointmentStatus.Success,
            appointmentId: "DK123456",
            appointmentNumber: 3
        },
            {
                patientAvatar: avatar1,
                patientName: "nguyễn văn X",
                patientBirth: new Date(),
                patientSex: 1,
                patientPhoneNumber: "0123456789",
                patientAddress: {
                    province: ProvinceDefault,
                    district: DistricDefault,
                    commune: CommuneDefault
                },
                appointmentDate: new Date(),
                appointmentTime: new Date(),
                appointmentReason: "đau đầu ù tai",
                appointmentStatus: AppointmentStatus.Waiting,
                appointmentId: "DK123456",
                appointmentNumber: 3
            }],
        currentSelection: -1
    })

    const {appointment, currentSelection} = state
    useEffect(() => {

    }, [])

    const handleClickAppointment = (index: number) => {
        setState({
            ...state,
            currentSelection: index
        });
    }

    return (
        <div id='user-appointment' className='user-appointment'>
            <HeaderPage icon={<EventAvailableIcon/>} text='Quản lý lịch khám' textChild='Danh sách lịch khám'/>
            <div className="appointment-container">
                <div className="list-appointment">
                    <div className="appointment-title">
                        Danh sách lịch khám
                    </div>
                    <div className="appointment-sub-title">
                        Vui lòng chọn một trong các lịch khám có sẵn để xem chi tiết hoặc bấm vào <strong>Đặt khám
                        mới</strong> để tạo lịch khám mới
                    </div>
                    <div className="list-appointment-wrap">
                        {/* <div className="no-appointment">
                            <ReportProblemOutlinedIcon sx={{ fontSize: '96px', color: '#cccccc', marginBottom: '12px' }}></ReportProblemOutlinedIcon>
                            Không tìm thấy lịch hẹn nào
                        </div> */}
                        {appointment?.map((item, index) => {
                            return <AppointmentItem
                                index={index}
                                avatar={item.patientAvatar}
                                name={item.patientName}
                                time={item.appointmentTime}
                                date={item.appointmentDate}
                                status={item.appointmentStatus!}
                                selectAppointment={handleClickAppointment}
                                isSelected={currentSelection === index}
                            />
                        })}
                    </div>
                    <div className="booking-new-appointment">
                        <Button variant={ButtonVariantType.Outlined} startIcon={<AddIcon/>}>
                            <Link to='/quan-ly/dat-lich-kham' style={{color: '#1976d2'}}>
                                Đặt khám mới
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="list-appointment-right">
                    <div className="list-appointment-detail">
                        <div className="appointment-title">
                            Chi tiết lịch khám
                        </div>
                        <div className="list-appointment-wrap">
                            {currentSelection === -1 ?
                                <div className="no-list-appointment">
                                    <LinkOffOutlinedIcon sx={{
                                        fontSize: '96px',
                                        color: '#cccccc',
                                        marginBottom: '12px'
                                    }}></LinkOffOutlinedIcon>
                                    Vui lòng chọn một lịch khám để xem chi tiết
                                </div> :
                                <AppointmentDetail appointment={appointment[currentSelection]}/>
                            }
                        </div>
                    </div>
                    {currentSelection !== -1 &&
                        <div className="appointment-hotline">
                            <InfoIcon sx={{fontSize: '14px', color: '#FFA95A'}}/>
                            <div className="hotline">
                                Lịch khám của bạn đã được gửi đi. Vui lòng đợi <strong>Riordan Clinic</strong> xác nhận.
                                Mọi yêu cầu về <strong>Hủy lịch/ Đổi lịch</strong> vui lòng gọi
                                Hotline <strong>19001234</strong> để được hỗ trợ.<br/>Trân trọng cảm ơn!
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default ListAppointment;