import React, { useState } from 'react'
import './PatientListPage.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import AdminHeaderPage from '../../../structure/headerPage/AdminHeaderPage';
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import { Label } from '@fluentui/react';
import { DatePicker } from '../../../common/datePicker/DatePicker';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TablePager from '../../../common/tablePager/TablePager';
import PatientListCommandBar from './PatientListCommandBar';
import { PatientListAction, PatientListTableColumns, TableType } from '../../../model/enum/tableTypeEnum';
import { AppointmentStatus } from '../../../model/enum/appointmentEnum';
import DialogView from '../../../common/dialog/Dialog';
import { useStateValue } from '../../../context/StateProvider';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { actionType } from '../../../context/Reducer';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function PatientListPage() {
  const [showAccept, setShowAccept] = useState<boolean>(false)
  const [showRefuse, setShowRefuse] = useState<boolean>(false)
  const [showCancel, setShowCancel] = useState<boolean>(false)
  const [loadingButton, setLoading] = useState<boolean>(false)
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [patientAction, setPatientAction] = useState<PatientListAction>()
  const onSearch = (newValue: string) => {
    console.log(newValue);
    
  }

  const onRenderActionButtons = (): JSX.Element[] => {
    return ([
      <PatientListCommandBar
        key={'patient-list-commandbar'}
        // {...props}
        tableType={TableType.PatientListTable}
        showPreAccept={() => { setShowAccept(true); setPatientAction(PatientListAction.Accept) }}
        showPreRefuse={() => { setShowRefuse(true); setPatientAction(PatientListAction.Refuse) }}
        showPreCancel={() => { setShowCancel(true); setPatientAction(PatientListAction.Cancel) }}
      />
    ])
  }

  const [, dispatch] = useStateValue()
  const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
    dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
  }

  const onSave = () => {
      let requestBody = {

      }
      const result = new Promise((resolve) => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setShowMessage(true)
          setShowAccept(false)
          showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
          resolve('success')
        }, 4000);
      }).then(() => {/*  */

      })

      return result
  }

  function createData(
    appointmentId: string,
    appointmentStatusI: AppointmentStatus,
    dateAppointment: string,
    timeAppointment: string,
    patientId: string,
    patientName: string,
    patientDateOfBirth: string,
    patientSexI: number,
    // patientPhoneNumber: string,
    // patientIdentityNumber: string,
    // patientAddress: string,

  ): PatientListTableColumns {
    let patientSex: string = patientSexI === 0 ? "Nam" : "Nữ"
    let appointmentStatus: string = appointmentStatusI === AppointmentStatus.Success ? "Đã duyệt" : (appointmentStatusI === AppointmentStatus.Cancel ? "Đã hủy" : "Chờ duyệt")
    return {
      appointmentId,
      appointmentStatus,
      dateAppointment,
      timeAppointment,
      patientId,
      patientName,
      patientDateOfBirth,
      patientSex,
      // patientPhoneNumber,
      // patientIdentityNumber,
      // patientAddress,

    };
  }

  const rows: PatientListTableColumns[] = [
    createData('DL20230001', AppointmentStatus.Cancel, '11/02/2023', '09:00', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0),
    createData('DL20230001', AppointmentStatus.Success, '11/02/2023', '09:00', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0),
    createData('DL20230001', AppointmentStatus.Waiting, '11/02/2023', '09:00', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 1),
    // createData('DL20230001', AppointmentStatus.Success, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Ngõ 118, Tân Triều, Thanh Trì, Hà Nội'),
    // createData('DL20230001', AppointmentStatus.Cancel, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Success, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Waiting, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 1, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Success, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Ngõ 118, Tân Triều, Thanh Trì, Hà Nội'),
    // createData('DL20230001', AppointmentStatus.Cancel, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Success, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Waiting, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 1, '0123456789', '0123456789010', 'Tân Triều'),
    // createData('DL20230001', AppointmentStatus.Success, '11/02/2023', 'BN20230001', 'Ngô Hoài Nam', '19/05/2001', 0, '0123456789', '0123456789010', 'Ngõ 118, Tân Triều, Thanh Trì, Hà Nội'),
  ];

  const renderBodyForm = () => {
    switch (patientAction) {
      case PatientListAction.Accept:
        return <span>Bạn có chắc chắn muốn <strong>Đồng ý</strong> lịch khám: <strong>DL1234</strong> vào lúc <strong>09:45</strong> ngày <strong>19/04/2023</strong></span>
      case PatientListAction.Refuse:
        return <div className='dialog-content'>
          <span>Bạn có chắc chắn muốn <strong>Từ chối</strong> lịch khám: <strong>DL1234</strong> vào lúc <strong>09:45</strong> ngày <strong>19/04/2023</strong></span>
          <Label>Lý do:</Label>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={'1'}
            // onChange={}
          >
            <FormControlLabel value="1" control={<Radio />} label="Khung giờ được chọn đã đầy" />
            <FormControlLabel value="2" control={<Radio />} label="..." />
          </RadioGroup>        
        </div>
      case PatientListAction.Cancel:
        return <span>Bạn có chắc chắn muốn <strong>Hủy</strong> lịch khám: <strong>DL1234</strong> vào lúc <strong>09:45</strong> ngày <strong>19/04/2023</strong></span>
    }
  }

  return (
    <div className='patientlist-page'>
      <BreadCrumb
        breadcrumbItem={[
          { key: 1, text: 'Danh sách lịch đặt khám', href: '/danh-sach-dat-kham' },
        ]}
      />
      <div className="patientlist-page-title">
        Danh sách lịch đặt khám
      </div>
      <div className="patientlist-page-search">
        <div className="search-id">
          <SearchBoxView
            placeholder='Mã đặt lịch/ Mã bệnh nhân/ CMND'
            onSearch={onSearch}
          />
        </div>
        <div className="search-date">
          <Label>Thời gian:</Label>
          <div className="search-date-item">
            <DatePicker
              placeholder="Chọn một giá trị"
              ariaLabel="Chọn một giá trị"
              isRequired={false}
              // strings={defaultDatePickerStrings}
              // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
              value={new Date()}
              // parseDateFromString={()}'
              maxDate={new Date()}
            />
          </div>
          <div className='line' style={{ width: '12px', height: '1px', backgroundColor: '#000000', margin: '0 8px'}}></div>
          <div className="search-date-item">
            <DatePicker
              placeholder="Chọn một giá trị"
              ariaLabel="Chọn một giá trị"
              isRequired={false}
              // strings={defaultDatePickerStrings}
              // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
              value={new Date()}
              // parseDateFromString={()}'
              maxDate={new Date()}
            />
          </div>
        </div>
      </div>
      <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
      {/* <DataTable/> */}
      
      <div className="patient-list-table">
        <TablePager<PatientListTableColumns>
          tableType={TableType.PatientListTable}
          batchActionElements={onRenderActionButtons()}
          rowData={rows}
          hasCheckBox
        />
      </div>
      <DialogView
        title={patientAction === PatientListAction.Accept ? 'Xác nhận duyệt đặt khám' : (patientAction === PatientListAction.Refuse ? 'Xác nhận từ chối đặt khám' : 'Xác nhận hủy đặt khám')}
        hidden={patientAction === PatientListAction.Accept ? !showAccept : (patientAction === PatientListAction.Refuse ? !showRefuse : !showCancel)}
        customContent={renderBodyForm()}
        confirmButtonText={'Đồng ý'}
        confirmWithPromise={onSave}
        closeButtonText='Hủy bỏ'
        close={() => { patientAction === PatientListAction.Accept ? setShowAccept(false) : (patientAction === PatientListAction.Refuse ? setShowRefuse(false) : setShowCancel(false)) }}
        loading={loadingButton}
      />
    </div>
  )
}

export default PatientListPage