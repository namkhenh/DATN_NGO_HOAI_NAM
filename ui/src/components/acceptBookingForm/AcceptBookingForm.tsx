import React, {useState} from 'react'
import './AcceptBookingForm.scss'
import DialogView from '../../common/dialog/Dialog'
import {IAppointmenViewModel} from '../../model/apimodel/appointmentInfo'
import AppointmentDetail from '../appointmentDetail/AppointmentDetail'
import {useStateValue} from '../../context/StateProvider'
import {actionType} from '../../context/Reducer'
import {MessageBarStatus} from '../../model/enum/messageBarEnum'

interface BookingFormProps {
    currentBookingAppointment: IAppointmenViewModel
    openAccept: boolean
    closeAccept: () => void
}
function AcceptBookingForm(props: BookingFormProps) {
    const [isOpen, setOpen] = useState<boolean>(props.openAccept)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [showMessage, setMessage] = useState<boolean>(false)
    const renderBodyForm = (): JSX.Element => {
        return (
            <AppointmentDetail appointment={props.currentBookingAppointment} />
        )
    }
    const handlecClose = () => {
        props.closeAccept()
    }

    const[, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        let requestBody = {
            id: "",
            code: "",
            name: "",
            dayOfExamination: props.currentBookingAppointment?.appointmentDate,
            timeOfExamination: props.currentBookingAppointment?.appointmentTime,
            reason: props.currentBookingAppointment?.appointmentReason,
            appUserId: props.currentBookingAppointment?.patientId,
            patientReceptionStatus: 1
        }
        return new Promise(res => {})
    }
    return (
        <DialogView
            title={'Xác nhận đặt khám'}
            hidden={!props.openAccept}
            customContent={renderBodyForm()}
            // closeWithPromise={this.onLogoutAction.bind(this)}
            // confirm={handlecClose}
            confirmButtonText={'Lưu'}
            confirmWithPromise={onSave}
            closeButtonText='Hủy bỏ'
            close={handlecClose}
            loading={loadingButton}
        />
    )
}

export default AcceptBookingForm