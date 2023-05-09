import React from 'react'
import {AppointmentStatus, HourBooking} from '../../model/enum/appointmentEnum'
import Avatar from '@mui/material/Avatar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './AppointmentItem.scss'

interface IAppointmentItemProps {
    index: number
    avatar?: string
    name: string
    time: number
    date: string
    status: AppointmentStatus
    selectAppointment: (index: number) => void
    isSelected?: boolean
}

function AppointmentItem(props: IAppointmentItemProps) {
    const { index, avatar, name, time, date, status, selectAppointment, isSelected } = props
    const getColorStatus = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.Success:
                return '#00794E'
            case AppointmentStatus.Cancel:
                return '#AC0000'
            case AppointmentStatus.Waiting:
                return '#EA703C'
            default:
                break;
        }
    }

    const getTextStatus = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.Success:
                return 'Đã duyệt'
            case AppointmentStatus.Cancel:
                return 'Đã hủy'
            case AppointmentStatus.Waiting:
                return 'Chờ duyệt'
            default:
                break;
        }
    }

    const getTextHour = (time: number) => {
        const hour = HourBooking.filter(item => item.key === time)
        return hour[0]!.text
    }

    return (
        <div className='appointment-item' style={{ border: isSelected ? '1px solid #00A2FF' : '1px solid #ffffff'}} onClick={() => {
            selectAppointment(index); ;
         }}>
            <Avatar alt={name} src={avatar} />
            <div className="patient-info">
                <div className="patient-name">{name}</div>
                <div className="patient-time">{`${getTextHour(time)} ngày ${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`}</div>
                <div className="patient-status" style={{ color: getColorStatus(status) }}>{getTextStatus(status)}</div>
            </div>
            {isSelected && <ArrowForwardIosIcon sx={{ fontSize: '32px', color: '#00A2FF' }} />}
        </div>
  )
}

export default AppointmentItem