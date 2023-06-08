import React, { useState } from 'react'
import './ApproveCalendarPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import { Label } from '@fluentui/react';
import { DatePicker } from '../../../common/datePicker/DatePicker';
import TablePager from '../../../common/tablePager/TablePager';
import {
    ApproveCalendarAction,
    ApproveCalendarTableColumns,
    ApproveCalendarTableDatas,
    TableType
} from '../../../model/enum/tableTypeEnum';
import { AppointmentStatus } from '../../../model/enum/appointmentEnum';
import DialogView from '../../../common/dialog/Dialog';
import { useStateValue } from '../../../context/StateProvider';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { actionType } from '../../../context/Reducer';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';



function ApproveCalendarPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [appointmentAction, setAppointmentAction] = useState<ApproveCalendarAction>()
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.ApproveCalendarTable}
                showAppointmentAccept={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Accept) }}
                showAppointmentRefuse={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Refuse) }}
                showAppointmentCancel={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Cancel) }}
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
                setShowDialog(false)
                showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                resolve('success')
            }, 4000);
        }).then(() => {/*  */

        })

        return result
    }

    function createData(
        appointmentCode: string,
        appointmentStatusI: AppointmentStatus,
        appointmentDateI: string,
        appointmentTimeI: string,
        patientCode: string,
        patientName: string,
        patientDateOfBirth: string,
        patientGenderI: number,
        patientPhoneNumber: string,
        // patientIdentityNumber: string,
        // patientAddress: string,

    ): ApproveCalendarTableColumns {
        // let appointmentId: JSX.Element = (
        //   <NavLink
        //     style={{ color: 'rgba(0, 0, 0, 0.87)'}}
        //     to={`/admin/danh-sach-dat-kham/chi-tiet-dat-kham/${appointmentIdI}`}
        //   >
        //     { appointmentIdI }
        //   </NavLink>
        // );

        let patientGender: string = patientGenderI === 0 ? "Nam" : "Nữ"
        let appointmentTime: string = appointmentDateI + '  ' + appointmentTimeI
        let appointmentStatus: JSX.Element = appointmentStatusI === AppointmentStatus.Success ? <div className='appointment-success'>Đã duyệt</div> : (appointmentStatusI === AppointmentStatus.Cancel ? <div className='appointment-cancel'>Đã hủy</div> : <div className='appointment-waiting'>Chờ duyệt</div>)
        return {
            appointmentCode,
            appointmentTime,
            appointmentStatus,
            patientCode,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber
            // patientPhoneNumber,
            // patientIdentityNumber,
            // patientAddress,

        };
    }

    const rows: ApproveCalendarTableColumns[][] = [
        [
            createData(
                "DL20230001",
                AppointmentStatus.Success,
                "11/02/2023",
                "09:00",
                "BN20230001",
                "Ngô Hoài Nam",
                "19/05/2001",
                1,
                "0123456789"
            ),
            createData(
                "DL20230002",
                AppointmentStatus.Waiting,
                "11/02/2023",
                "09:00",
                "BN20230002",
                "Ngô Hoài Nam",
                "19/05/2001",
                0,
                "0123456789"
            ),
            createData(
                "DL20230003",
                AppointmentStatus.Cancel,
                "11/02/2023",
                "09:00",
                "BN20230003",
                "Ngô Hoài Nam",
                "19/05/2001",
                0,
                "0123456789"
            )], [
            createData(
                "DL20230004",
                AppointmentStatus.Waiting,
                "11/02/2023",
                "09:00",
                "BN20230004",
                "Ngô Hoài Nam",
                "19/05/2001",
                0,
                "0123456789"
            )
        ]
    ];

    const datas: ApproveCalendarTableDatas[][] = [
        [
            {
                appointmentId: 'sdklghsdhjfjk34234',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 0,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                appointmentId: 'sdgjhsdkjfsdjk223',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'lkdfjklasjdf23123',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 1,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            },
            {
                appointmentId: 'asfdf2343rfsdfsg',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'sdgdsfhdgfh234rd',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 2,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            }
        ],
        [
            {
                appointmentId: 'aslkjfhsdjkhfjk324234',
                appointmentCode: 'HS12345',
                appointmentDate: '22/03/2003',
                appointmentTime: '09:45',
                appointmentReason: 'đau đầu',
                patientId: 'sdfsdflkmmas23m4k32',
                patientCode: 'BN23458',
                patientName: 'Ngô Hoài Nam',
                appointmentStatus: 1,
                patientDateOfBirth: '22/03/2002',
                patientGender: 0,
                patientPhoneNumber: '0123456789',
                patientIdentityNumber: '0123456712312',
                patientAddress: 'ngõ 118, Tân Triều',
            }
        ]
    ];

    const renderBodyForm = () => {
        switch (appointmentAction) {
            case ApproveCalendarAction.Accept:
                return <span>Bạn có chắc chắn muốn <strong>Đồng ý</strong> lịch khám: <strong>DL1234</strong> vào lúc <strong>09:45</strong> ngày <strong>19/04/2023</strong></span>
            case ApproveCalendarAction.Refuse:
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
            case ApproveCalendarAction.Cancel:
                return <span>Bạn có chắc chắn muốn <strong>Hủy</strong> lịch khám: <strong>DL1234</strong> vào lúc <strong>09:45</strong> ngày <strong>19/04/2023</strong></span>
        }
    }

    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Duyệt lịch đặt khám', href: '/danh-sach-dat-kham' },
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
                    <div className='line' style={{ width: '12px', height: '1px', backgroundColor: '#000000', margin: '0 8px' }}></div>
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

            <div className="patient-list-table">
                <TablePager<ApproveCalendarTableColumns, ApproveCalendarTableDatas>
                    tableType={TableType.ApproveCalendarTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={15}
                    hasNavigate={false}
                />
            </div>
            <DialogView
                title={appointmentAction === ApproveCalendarAction.Accept ? 'Xác nhận duyệt đặt khám' : (appointmentAction === ApproveCalendarAction.Refuse ? 'Xác nhận từ chối đặt khám' : 'Xác nhận hủy đặt khám')}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                confirmButtonText={'Đồng ý'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => { setShowDialog(false) }}
                loading={loadingButton}
            />
        </div>
    )
}

export default ApproveCalendarPage